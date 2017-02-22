/*********************************************************************************

MIT License

Copyright (c) 2017 - Miguel Ángel Pérez Martínez

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*********************************************************************************/
"use strict";
require("reflect-metadata");
const Fields = require("./fields");
class FieldOptions {
}
exports.FieldOptions = FieldOptions;
function Field(options) {
    return (target, propertyKey) => {
        let fields = Reflect.getMetadata("fields", target) || [];
        fields.push(propertyKey);
        Reflect.defineMetadata("fields", fields, target);
        Reflect.defineMetadata("field:options", options, target, propertyKey);
    };
}
exports.Field = Field;
function fillImplicitFieldSettings(type) {
    if (!Reflect.getMetadata("fields:options_explicited", type.prototype)) {
        let fields = Reflect.getMetadata("fields", type.prototype);
        let allRequired = true;
        for (let field of fields) {
            let fieldOptions = Reflect.getMetadata("field:options", type.prototype, field);
            if (fieldOptions != undefined && fieldOptions.required != undefined) {
                allRequired = !fieldOptions.required;
                break;
            }
        }
        for (let field of fields) {
            let fieldOptions = Reflect.getMetadata("field:options", type.prototype, field) || new FieldOptions();
            fieldOptions.required = fieldOptions.required == undefined ? allRequired : fieldOptions.required;
            if (fieldOptions.typeConstraints != undefined && fieldOptions.typeConstraints.pattern != undefined) {
                fieldOptions.typeConstraints.pattern = Fields.stringConstraintPatternToRegExp(fieldOptions.typeConstraints.pattern);
            }
            if (fieldOptions.maps == undefined) {
                fieldOptions.maps = [];
            }
            if (!(fieldOptions.maps instanceof Array)) {
                fieldOptions.maps = [fieldOptions.maps];
            }
            for (let map of fieldOptions.maps) {
                if (map.types == undefined) {
                    map.types = [];
                }
                if (!(map.types instanceof Array)) {
                    map.types = [map.types];
                }
            }
            Reflect.defineMetadata("field:options", fieldOptions, type.prototype, field);
        }
        Reflect.defineMetadata("fields:options_explicited", true, type.prototype);
    }
}
function checkIfTypeHasFieldsMetadata(type) {
    return Reflect.getMetadata("fields", type.prototype) != undefined;
}
exports.checkIfTypeHasFieldsMetadata = checkIfTypeHasFieldsMetadata;
function parse(type, obj) {
    fillImplicitFieldSettings(type);
    let fields = Reflect.getMetadata("fields", type.prototype);
    if (fields == undefined) {
        throw new Error(`Type '${type.name}' does not have fields metadata.`);
    }
    let ret = new type();
    for (let field of fields) {
        let fieldType = Reflect.getMetadata("design:type", type.prototype, field);
        let fieldOptions = Reflect.getMetadata("field:options", type.prototype, field);
        if (obj[field] != undefined) {
            ret[field] = obj[field];
            try {
                if (checkIfTypeHasFieldsMetadata(fieldType)) {
                    ret[field] = parse(fieldType, ret[field]);
                }
                else {
                    ret[field] = Fields.parseValue(fieldType, ret[field], fieldOptions.typeConstraints, fieldOptions.maps);
                }
            }
            catch (err) {
                throw new Error(`Parse failed for field ${field}: ` + err.message);
            }
        }
        else {
            if (fieldOptions.required === true) {
                throw new Error(`Missing required field '${field}'`);
            }
        }
    }
    return ret;
}
exports.parse = parse;
function getAcceptedTypesForField(type, field) {
    if (!checkIfTypeHasFieldsMetadata(type)) {
        return undefined;
    }
    fillImplicitFieldSettings(type);
    let fieldOptions = Reflect.getMetadata("field:options", type.prototype, field);
    let acceptedTypes = [Reflect.getMetadata("design:type", type.prototype, field)];
    if (fieldOptions != undefined) {
        for (let map of fieldOptions.maps) {
            for (let mapType of map.types) {
                if (acceptedTypes.indexOf(mapType) === -1) {
                    acceptedTypes.push(mapType);
                }
            }
        }
    }
    return acceptedTypes;
}
exports.getAcceptedTypesForField = getAcceptedTypesForField;
function reduce(type, callback, initialValue) {
    fillImplicitFieldSettings(type);
    let fields = Reflect.getMetadata("fields", type.prototype);
    if (fields == undefined) {
        throw new Error(`Type '${type.name}' does not have fields metadata.`);
    }
    for (let field of fields) {
        initialValue = callback(initialValue, field, Reflect.getMetadata("field:options", type.prototype, field));
    }
    return initialValue;
}
exports.reduce = reduce;
// Reduce example
function getTextRepresentation(type) {
    return reduce(type, (accumValue, fieldName, fieldOptions) => {
        accumValue += `Field: ${fieldName} ${fieldOptions.required ? "" : "[ Optional ]"}\n`;
        accumValue += `Valid Types: ${getAcceptedTypesForField(type, fieldName).reduce((acc, cur) => {
            return acc + ` ${cur.name} |`;
        }, "").slice(0, -2)}\n`;
        let extraConstraints = [];
        if (fieldOptions.typeConstraints != undefined) {
            if (fieldOptions.typeConstraints.minLength != undefined) {
                extraConstraints.push(`Minimum acceptable length for string: ${fieldOptions.typeConstraints.minLength}`);
            }
            if (fieldOptions.typeConstraints.maxLength) {
                extraConstraints.push(`Maximum acceptable length for string: ${fieldOptions.typeConstraints.maxLength}`);
            }
            if (fieldOptions.typeConstraints.pattern != undefined) {
                extraConstraints.push(`The string must match the RegEx: '${fieldOptions.typeConstraints.pattern.toString()}'`);
            }
            if (fieldOptions.typeConstraints.multipleOf != undefined) {
                extraConstraints.push(`Number must be a multiple of: ${fieldOptions.typeConstraints.multipleOf}`);
            }
            if (fieldOptions.typeConstraints.minimum != undefined) {
                extraConstraints.push(`Number must be ${fieldOptions.typeConstraints.exclusiveMinimum === true ? " " : " equal or "}greater than ${fieldOptions.typeConstraints.minimum}`);
            }
            if (fieldOptions.typeConstraints.maximum) {
                extraConstraints.push(`Number must be${fieldOptions.typeConstraints.exclusiveMaximum === true ? " " : " equal or "}less than ${fieldOptions.typeConstraints.maximum}`);
            }
        }
        if (extraConstraints.length > 0) {
            accumValue += `Constraints:\n`;
            for (let c of extraConstraints) {
                accumValue += `\t${c}\n`;
            }
        }
        accumValue += "---------------------------------------------------------\n";
        return accumValue;
    }, "");
}
exports.getTextRepresentation = getTextRepresentation;
//# sourceMappingURL=tom-collins.js.map
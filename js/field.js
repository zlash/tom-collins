"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const Parse = require("./parse");
function Field(options) {
    return (target, propertyKey) => {
        let fields = Reflect.getMetadata("fields", target) || [];
        fields.push(propertyKey);
        Reflect.defineMetadata("fields", fields, target);
        options = options || {};
        if (options.targetType == undefined) {
            options = {
                constraints: options
            };
        }
        Reflect.defineMetadata("field:options", options, target, propertyKey);
    };
}
exports.Field = Field;
function fillImplicitFieldSettings(type) {
    if (!Reflect.getMetadata("fields:options_explicited", type.prototype)) {
        /*
        let fields = Reflect.getMetadata("fields", type.prototype);
        let allRequired = true;

        for (let field of fields) {
            let fieldOptions: Parse.ParseOptionsI = Reflect.getMetadata("field:options", type.prototype, field);
            if (fieldOptions != undefined && fieldOptions.constraints != undefined && fieldOptions.constraints.optional != undefined) {
                allRequired = fieldOptions.constraints.optional;
                break;
            }
        }

        for (let field of fields) {
            let fieldOptions: FieldOptions = Reflect.getMetadata("field:options", type.prototype, field) || new FieldOptions();
            fieldOptions.required = fieldOptions.required == undefined ? allRequired : fieldOptions.required;
            Reflect.defineMetadata("field:options", fieldOptions, type.prototype, field);
        }
        */
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
        if (fieldOptions.targetType == undefined) {
            fieldOptions.targetType = fieldType;
        }
        fieldOptions.constraints = fieldOptions.constraints || {};
        try {
            if (checkIfTypeHasFieldsMetadata(fieldType)) {
                if (obj[field] == undefined) {
                    if (fieldOptions.constraints.optional !== true) {
                        throw new Error("Value is undefined and not optional.");
                    }
                }
                else {
                    ret[field] = parse(fieldType, obj[field]);
                }
            }
            else {
                ret[field] = Parse.parseValue(fieldOptions, obj[field]);
            }
        }
        catch (err) {
            throw new Error(`Parse failed for field ${field}: ${err.message} || [With Payload: ${JSON.stringify(obj[field])}]`);
        }
    }
    return ret;
}
exports.parse = parse;
/*
TODO: REVIEW AND FIX

export function getAcceptedTypesForField<T>(type: GenericConstructor<T>, field: string) {

    if (!checkIfTypeHasFieldsMetadata(type)) {
        return undefined;
    }

    fillImplicitFieldSettings(type);

    let fieldOptions: FieldOptions = Reflect.getMetadata("field:options", type.prototype, field);

    let acceptedTypes = [Reflect.getMetadata("design:type", type.prototype, field)];

    if (fieldOptions != undefined) {

        for (let map of (fieldOptions.maps as Maps.Map[])) {
            if (acceptedTypes.indexOf(map.type) === -1) {
                acceptedTypes.push(map.type);
            }
        }

    }

    return acceptedTypes;
}

*/
function reduce(type, callback, initialValue) {
    fillImplicitFieldSettings(type);
    let fields = Reflect.getMetadata("fields", type.prototype);
    if (fields == undefined) {
        throw new Error(`Type '${type.name}' does not have fields metadata.`);
    }
    for (let field of fields) {
        initialValue = callback(initialValue, field, Reflect.getMetadata("design:type", type.prototype, field), Reflect.getMetadata("field:options", type.prototype, field));
    }
    return initialValue;
}
exports.reduce = reduce;
//# sourceMappingURL=field.js.map
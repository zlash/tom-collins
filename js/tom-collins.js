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
var Patterns;
(function (Patterns) {
    Patterns[Patterns["Email"] = 0] = "Email";
    Patterns[Patterns["Uri"] = 1] = "Uri"; // A universal resource identifier (URI), according to RFC3986.
})(Patterns = exports.Patterns || (exports.Patterns = {}));
class Map {
}
exports.Map = Map;
class FieldConstraints {
}
exports.FieldConstraints = FieldConstraints;
/**
 * Predefined maps.
 */
class Maps {
}
Maps.stringToDate = {
    types: String,
    map: (v) => {
        return new Date(v);
    }
};
exports.Maps = Maps;
function Field(constraints) {
    return (target, propertyKey) => {
        let fields = Reflect.getMetadata("fields", target) || [];
        fields.push(propertyKey);
        Reflect.defineMetadata("fields", fields, target);
        Reflect.defineMetadata("field:constraints", constraints, target, propertyKey);
    };
}
exports.Field = Field;
function fillImplicitFieldSettings(type) {
    if (!Reflect.getMetadata("fields:options_explicited", type.prototype)) {
        let fields = Reflect.getMetadata("fields", type.prototype);
        let allRequired = true;
        for (let field of fields) {
            let fieldConstraints = Reflect.getMetadata("field:constraints", type.prototype, field);
            if (fieldConstraints != undefined && fieldConstraints.required != undefined) {
                allRequired = !fieldConstraints.required;
                break;
            }
        }
        for (let field of fields) {
            let fieldConstraints = Reflect.getMetadata("field:constraints", type.prototype, field) || new FieldConstraints();
            fieldConstraints.required = fieldConstraints.required == undefined ? allRequired : fieldConstraints.required;
            if (fieldConstraints.pattern != undefined) {
                if (typeof (fieldConstraints.pattern) === "string") {
                    fieldConstraints.pattern = new RegExp(fieldConstraints.pattern);
                }
                if (typeof (fieldConstraints.pattern) === "number") {
                    fieldConstraints.pattern = {
                        [Patterns.Email]: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        [Patterns.Uri]: new RegExp("^[^:/?#]+:?//[^/?#]*?[^?#]*\?[^#]*?#.*?")
                    }[fieldConstraints.pattern];
                }
            }
            if (fieldConstraints.validTypes == undefined) {
                fieldConstraints.validTypes = Reflect.getMetadata("design:type", type.prototype, field);
            }
            if (!(fieldConstraints.validTypes instanceof Array)) {
                fieldConstraints.validTypes = [fieldConstraints.validTypes];
            }
            if (fieldConstraints.maps == undefined) {
                fieldConstraints.maps = [];
            }
            if (!(fieldConstraints.maps instanceof Array)) {
                fieldConstraints.maps = [fieldConstraints.maps];
            }
            for (let map of fieldConstraints.maps) {
                if (map.types == undefined) {
                    map.types = [];
                }
                if (!(map.types instanceof Array)) {
                    map.types = [map.types];
                }
            }
            Reflect.defineMetadata("field:constraints", fieldConstraints, type.prototype, field);
        }
        Reflect.defineMetadata("fields:options_explicited", true, type.prototype);
    }
}
function checkPODtype(obj, podType) {
    if (podType === String && ((typeof obj) === "string" || obj instanceof String)) {
        return true;
    }
    else if (podType === Number && ((typeof obj) === "number" || obj instanceof Number)) {
        return true;
    }
    else if (podType === Boolean && ((typeof obj) === "boolean" || obj instanceof Boolean)) {
        return true;
    }
    return false;
}
function parse(type, obj) {
    fillImplicitFieldSettings(type);
    let fields = Reflect.getMetadata("fields", type.prototype);
    if (fields == undefined) {
        throw new Error(`Type '${type.name}' does not have fields metadata.`);
    }
    let ret = new type();
    for (let field of fields) {
        let fieldConstraints = Reflect.getMetadata("field:constraints", type.prototype, field);
        if (obj[field] != undefined) {
            ret[field] = obj[field];
            map_loop: for (let map of fieldConstraints.maps) {
                for (let mapType of map.types) {
                    if (checkPODtype(ret[field], mapType) || ret[field] instanceof mapType) {
                        ret[field] = map.map(ret[field]);
                        break map_loop;
                    }
                }
            }
            let validType = false;
            for (let targetFieldType of fieldConstraints.validTypes) {
                if (checkPODtype(ret[field], targetFieldType)) {
                    validType = true;
                    break;
                }
                else if (Reflect.getMetadata("fields", targetFieldType.prototype) != undefined) {
                    try {
                        ret[field] = parse(targetFieldType, ret[field]);
                        validType = true;
                        break;
                    }
                    catch (err) {
                        throw new Error(`Error parsing field '${field}' of type '${type.name}': ${err.message}`);
                    }
                }
                else if (ret[field] instanceof targetFieldType) {
                    validType = true;
                    break;
                }
            }
            if (!validType) {
                throw new Error(`Invalid type for field ${field}, expected '${fieldConstraints.validTypes.reduce((acc, cur) => {
                    return acc + `${cur.name} |`;
                }, "").slice(0, -2)}'`);
            }
            if ((typeof ret[field]) === "string" || ret[field] instanceof String) {
                if (fieldConstraints.minLength != undefined && ret[field].length < fieldConstraints.minLength) {
                    throw new Error(`Field '${field}' must be at least ${fieldConstraints.minLength} characters long.`);
                }
                if (fieldConstraints.maxLength != undefined && ret[field].length < fieldConstraints.maxLength) {
                    throw new Error(`Field '${field}' must be less than ${fieldConstraints.maxLength} characters long.`);
                }
                if (fieldConstraints.pattern != undefined) {
                    if (fieldConstraints.pattern.exec(ret[field]) == undefined) {
                        throw new Error(`Field '${field}' does not match the required pattern`);
                    }
                }
            }
            else if ((typeof ret[field]) === "number" || ret[field] instanceof Number) {
                if (fieldConstraints.multipleOf != undefined && ret[field] % fieldConstraints.multipleOf === 0) {
                    throw new Error(`Field '${field}' must be a multiple of ${fieldConstraints.multipleOf}`);
                }
                if (fieldConstraints.minimum != undefined) {
                    let violation = ret[field] < fieldConstraints.minimum;
                    violation = fieldConstraints.exclusiveMinimum ? (violation && ret[field] === fieldConstraints.minimum) : violation;
                    if (violation) {
                        throw new Error(`Field '${field}' violates minimum value (${fieldConstraints.minimum}) constraint.`);
                    }
                }
                if (fieldConstraints.maximum != undefined) {
                    let violation = ret[field] > fieldConstraints.maximum;
                    violation = fieldConstraints.exclusiveMaximum ? (violation && ret[field] === fieldConstraints.maximum) : violation;
                    if (violation) {
                        throw new Error(`Field '${field}' violates minimum value (${fieldConstraints.maximum}) constraint.`);
                    }
                }
            }
        }
        else {
            if (fieldConstraints.required === true) {
                throw new Error(`Missing field '${field}'`);
            }
        }
    }
    return ret;
}
exports.parse = parse;
//# sourceMappingURL=tom-collins.js.map
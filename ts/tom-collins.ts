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

import "reflect-metadata";

export enum Patterns {
    Email, // Internet email address, see RFC 5322, section 3.4.1.
    Uri // A universal resource identifier (URI), according to RFC3986.
}

export class Map {
    types: any | any[];
    map: (v: any) => any;
}

export class FieldConstraints {
    /**
     * Minimum acceptable length for string
     */
    minLength?: number;
    /**
     * Maximum acceptable length for string
     */
    maxLength?: number;
    /**
     * A pattern that the string must match to. It can be a RegEx object, or a RegEx string.
     * Also, it can be one of the predefined pattens in the 'Pattern' enum.
     */
    pattern?: RegExp | string | Patterns;

    /**
     * Numbers can be restricted to a multiple of a given number, using the multipleOf keyword. It may be set to any positive number.
     * Clever use of the multipleOf keyword can be used to accept only integers, setting it to: 1.0
     */
    multipleOf?: number;

    /**
     * Ranges of numbers are specified using a combination of the minimum, maximum, exclusiveMinimum and exclusiveMaximum keywords.

        * minimum specifies a minimum numeric value.
        * exclusiveMinimum is a boolean. When true, it indicates that the range excludes the minimum value. 
                                         When false (or not included), it indicates that the range includes the minimum value.
        * maximum specifies a maximum numeric value.
        * exclusiveMaximum is a boolean. When true, it indicates that the range excludes the maximum value. 
                                         When false (or not included), it indicates that the range includes the maximum value.

     */
    minimum?: number;
    exclusiveMinimum?: boolean;
    maximum?: boolean;
    exclusiveMaximum?: boolean;

    /**
     * A type or a list of types valid for this field. It overrides the types injected in metadata by the TypeScript compiled.
     * Useful for cases when the compiler uses a common ancestor like in common unions (string|number gets tagged as Object)
     */
    validTypes?: any | any[];

    /**
     * Flags the field as required. By default, all fields are required implicitly.
     * If a field is explicitly marked as required, then all the other field will be implicitly marked as optional.
     * If a field is explicitly marked as optional, then all the other fields will be required.
     * In the case of two fields using different settings , behaviour will depend on the first seen so it's recommended to use this 
     * setting consistently (only settinng it to true for some fields, or only setting it to false for some fields)
     */
    required?: boolean;

    /**
     * A map or a list of maps for the current function. If a supplied value type matches any of the maps' types. The map will be
     * applied before parsing.
     */
    maps?: Map | Map[];
}

/**
 * Predefined maps.
 */
export class Maps {
    static stringToDate: Map = {
        types: String,
        map: (v: String) => {
            return new Date(v);
        }
    };
}

export function Field(constraints?: FieldConstraints) {
    return (target: any, propertyKey: string | symbol): void => {
        let fields = Reflect.getMetadata("fields", target) || [];
        fields.push(propertyKey);
        Reflect.defineMetadata("fields", fields, target);
        Reflect.defineMetadata("field:constraints", constraints, target, propertyKey);
    };
}


export type GenericConstructor<T> = { new (...args: any[]): T; };

export class ParseOptions {
    /**
     * Only performs validation. Instead of a new instance returns a validation result.
     */
    validateOnly: boolean;
}

function fillImplicitFieldSettings<T>(type: GenericConstructor<T>) {
    if (!Reflect.getMetadata("fields:options_explicited", type.prototype)) {

        let fields = Reflect.getMetadata("fields", type.prototype);
        let allRequired = true;

        for (let field of fields) {
            let fieldConstraints: FieldConstraints = Reflect.getMetadata("field:constraints", type.prototype, field);
            if (fieldConstraints != undefined && fieldConstraints.required != undefined) {
                allRequired = !fieldConstraints.required;
                break;
            }
        }

        for (let field of fields) {
            let fieldConstraints: FieldConstraints = Reflect.getMetadata("field:constraints", type.prototype, field) || new FieldConstraints();
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

export function parse<T>(type: GenericConstructor<T>, obj: any, options?: ParseOptions): T {

    fillImplicitFieldSettings(type);
    let fields = Reflect.getMetadata("fields", type.prototype);

    let ret = new type();
    for (let field of fields) {

        let fieldConstraints: FieldConstraints = Reflect.getMetadata("field:constraints", type.prototype, field);

        if (obj[field] != undefined) {

            ret[field] = obj[field];

            map_loop: for (let map of (fieldConstraints.maps as Map[])) {
                for (let mapType of map.types) {
                    if (mapType === typeof (ret[field])) {
                        ret[field] = map.map(ret[field]);
                        break map_loop;
                    }
                }
            }

            let validType = false;

            for (let type of fieldConstraints.validTypes) {
                if (type === String && ((typeof ret[field]) === "string" || ret[field] instanceof String)) {
                    validType = true;
                    break;
                } else if (type === Number && ((typeof ret[field]) === "number" || ret[field] instanceof Number)) {
                    validType = true;
                    break;
                } else if (type === Boolean && ((typeof ret[field]) === "boolean" || ret[field] instanceof Boolean)) {
                    validType = true;
                    break;
                } else if (ret[field] instanceof type) {
                    validType = true;
                    break;
                }
            }

            if (!validType) {
                throw new Error(`Invalid type for field ${field}`);
            }

            if ((typeof ret[field]) === "string" || ret[field] instanceof String) {

                if (fieldConstraints.minLength != undefined && (ret[field] as string).length < fieldConstraints.minLength) {
                    throw new Error(`Field ${field} must be at least ${fieldConstraints.minLength} characters long.`);
                }

                if (fieldConstraints.maxLength != undefined && (ret[field] as string).length < fieldConstraints.maxLength) {
                    throw new Error(`Field ${field} must be less than ${fieldConstraints.maxLength} characters long.`);
                }

                if (fieldConstraints.pattern != undefined) {
                    if ((fieldConstraints.pattern as RegExp).exec(ret[field]) == undefined) {
                        throw new Error(`Field ${field} does not match the required pattern`);
                    }
                }


            } else if ((typeof ret[field]) === "number" || ret[field] instanceof Number) {

                if (fieldConstraints.multipleOf != undefined && ret[field] % fieldConstraints.multipleOf === 0) {
                    throw new Error(`Field ${field} must be a multiple of ${fieldConstraints.multipleOf}`);
                }

                if (fieldConstraints.minimum != undefined) {
                    let violation = ret[field] < fieldConstraints.minimum;
                    violation = fieldConstraints.exclusiveMinimum ? (violation && ret[field] === fieldConstraints.minimum) : violation;
                    if (violation) {
                        throw new Error(`Field ${field} violates minimum value (${fieldConstraints.minimum}) constraint.`);
                    }
                }

                if (fieldConstraints.maximum != undefined) {
                    let violation = ret[field] > fieldConstraints.maximum;
                    violation = fieldConstraints.exclusiveMaximum ? (violation && ret[field] === fieldConstraints.maximum) : violation;
                    if (violation) {
                        throw new Error(`Field ${field} violates minimum value (${fieldConstraints.maximum}) constraint.`);
                    }
                }

            }

        } else {
            if (fieldConstraints.required === true) {
                throw new Error(`Missing field ${field}`);
            }
        }
    }
    return ret;
}

export function sampleSqlInsert<T>(ctr: GenericConstructor<T>, table: string, obj: T) {
    let fields = Reflect.getMetadata("fields", ctr.prototype);
    let values = "";

    for (let field of fields) {
        values += field + " = " + JSON.stringify(obj[field]) + ", ";
    }

    return `UPDATE ${table} SET ${values.substring(0, values.length - 2)}`;
}

export function printType<T>(ctr: GenericConstructor<T>) {
    let fields = Reflect.getMetadata("fields", ctr.prototype);
    let ret = {};
    for (let field of fields) {
        let fieldType = Reflect.getMetadata("design:type", ctr.prototype, field);
        ret[field] = fieldType.name;
    }
    return ctr.name + "\n" + JSON.stringify(ret, undefined, 2);
}





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

import * as Maps from "./maps";
import * as Fields from "./fields";

export class FieldOptions {

    /**
     * Constraints to apply to the field type
     */
    typeConstraints?: Fields.Constraints;

    /**
     * Flags the field as required. By default, all fields are required implicitly.
     * If a field is explicitly marked as required, then all the other field will be implicitly marked as optional.
     * If a field is explicitly marked as optional, then all the other fields will be required.
     * In the case of two fields using different settings , behaviour will depend on the first seen so it's recommended to use this 
     * setting consistently (only settinng it to true for some fields, or only setting it to false for some fields)
     */
    required?: boolean;

    /**
     * A map or a list of maps for the current field. If a supplied value type matches any of the maps' types. The map will be
     * applied before validation.
     */
    maps?: Maps.Map | Maps.Map[];
}


export function Field(options?: FieldOptions) {
    return (target: any, propertyKey: string | symbol): void => {
        let fields = Reflect.getMetadata("fields", target) || [];
        fields.push(propertyKey);
        Reflect.defineMetadata("fields", fields, target);
        Reflect.defineMetadata("field:options", options, target, propertyKey);
    };
}

export type GenericConstructor<T> = { new (...args: any[]): T; };

function fillImplicitFieldSettings<T>(type: GenericConstructor<T>) {
    if (!Reflect.getMetadata("fields:options_explicited", type.prototype)) {

        let fields = Reflect.getMetadata("fields", type.prototype);
        let allRequired = true;

        for (let field of fields) {
            let fieldOptions: FieldOptions = Reflect.getMetadata("field:options", type.prototype, field);
            if (fieldOptions != undefined && fieldOptions.required != undefined) {
                allRequired = !fieldOptions.required;
                break;
            }
        }

        for (let field of fields) {
            let fieldOptions: FieldOptions = Reflect.getMetadata("field:options", type.prototype, field) || new FieldOptions();
            fieldOptions.required = fieldOptions.required == undefined ? allRequired : fieldOptions.required;

            if (fieldOptions.maps == undefined) {
                fieldOptions.maps = [];
            }

            if (!(fieldOptions.maps instanceof Array)) {
                fieldOptions.maps = [fieldOptions.maps];
            }

            Reflect.defineMetadata("field:options", fieldOptions, type.prototype, field);
        }

        Reflect.defineMetadata("fields:options_explicited", true, type.prototype);
    }
}

export function checkIfTypeHasFieldsMetadata<T>(type: GenericConstructor<T>) {
    return Reflect.getMetadata("fields", type.prototype) != undefined;
}

export function parse<T>(type: GenericConstructor<T>, obj: any): T {

    fillImplicitFieldSettings(type);
    let fields = Reflect.getMetadata("fields", type.prototype);

    if (fields == undefined) {
        throw new Error(`Type '${type.name}' does not have fields metadata.`);
    }

    let ret = new type();

    for (let field of fields) {

        let fieldType = Reflect.getMetadata("design:type", type.prototype, field);
        let fieldOptions: FieldOptions = Reflect.getMetadata("field:options", type.prototype, field);

        try {
            if (checkIfTypeHasFieldsMetadata(fieldType)) {
                ret[field] = parse(fieldType, obj[field]);
            } else {
                ret[field] = Fields.parseValue(fieldType, obj[field], { ...fieldOptions.typeConstraints, optional: fieldOptions.required !== true }, fieldOptions.maps as Maps.Map[]);
            }
        } catch (err) {
            throw new Error(`Parse failed for field ${field}: ` + err.message);
        }

    }
    return ret;
}

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

export function reduce<T, U>(type: GenericConstructor<T>, callback: (accumValue: U, fieldName: string, fieldOptions: FieldOptions) => U, initialValue: U): U {
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


// Reduce example
export function getTextRepresentation<T>(type: GenericConstructor<T>) {
    return reduce(type, (accumValue, fieldName, fieldOptions) => {

        accumValue += `Field: ${fieldName} ${fieldOptions.required ? "" : "[ Optional ]"}\n`;
        accumValue += `Valid Types: ${getAcceptedTypesForField(type, fieldName).reduce((acc: string, cur: any) => {
            return acc + ` ${cur.name} |`;
        }, "").slice(0, -1)}\n`;

        let extraConstraints = [];

        type SC = Fields.StringConstraints;
        type NC = Fields.NumberConstraints;

        if (fieldOptions.typeConstraints != undefined) {
            if ((fieldOptions.typeConstraints as SC).minLength != undefined) {
                extraConstraints.push(`Minimum acceptable length for string: ${(fieldOptions.typeConstraints as SC).minLength}`);
            }

            if ((fieldOptions.typeConstraints as SC).maxLength) {
                extraConstraints.push(`Maximum acceptable length for string: ${(fieldOptions.typeConstraints as SC).maxLength}`);
            }

            if ((fieldOptions.typeConstraints as SC).pattern != undefined) {
                extraConstraints.push(`The string must match the RegEx: '${(fieldOptions.typeConstraints as SC).pattern.toString()}'`);
            }

            if ((fieldOptions.typeConstraints as NC).multipleOf != undefined) {
                extraConstraints.push(`Number must be a multiple of: ${(fieldOptions.typeConstraints as NC).multipleOf}`);
            }

            if ((fieldOptions.typeConstraints as NC).minimum != undefined) {
                extraConstraints.push(`Number must be ${(fieldOptions.typeConstraints as NC).exclusiveMinimum === true ? " " : " equal or "}greater than ${(fieldOptions.typeConstraints as NC).minimum}`); // tslint:disable-line  
            }

            if ((fieldOptions.typeConstraints as NC).maximum) {
                extraConstraints.push(`Number must be${(fieldOptions.typeConstraints as NC).exclusiveMaximum === true ? " " : " equal or "}less than ${(fieldOptions.typeConstraints as NC).maximum}`);
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
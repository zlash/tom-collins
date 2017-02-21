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
export declare enum Patterns {
    Email = 0,
    Uri = 1,
}
export declare class Map {
    types: any | any[];
    map: (v: any) => any;
}
export declare class FieldConstraints {
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
export declare class Maps {
    static stringToDate: Map;
}
export declare function Field(constraints?: FieldConstraints): (target: any, propertyKey: string | symbol) => void;
export declare type GenericConstructor<T> = {
    new (...args: any[]): T;
};
export declare function parse<T>(type: GenericConstructor<T>, obj: any): T;
export declare function checkIfTypeHasFieldsMetadata<T>(type: GenericConstructor<T>): boolean;
export declare function getAcceptedTypesForField<T>(type: GenericConstructor<T>, field: string): any[];
export declare function reduce<T, U>(type: GenericConstructor<T>, callback: (accumValue: U, fieldName: string, fieldConstraints: any) => U, initialValue: U): U;
export declare function getTextRepresentation<T>(type: GenericConstructor<T>): string;

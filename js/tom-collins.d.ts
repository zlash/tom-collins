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
export declare class FieldOptions {
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
export declare function Field(options?: FieldOptions): (target: any, propertyKey: string | symbol) => void;
export declare type GenericConstructor<T> = {
    new (...args: any[]): T;
};
export declare function checkIfTypeHasFieldsMetadata<T>(type: GenericConstructor<T>): boolean;
export declare function parse<T>(type: GenericConstructor<T>, obj: any): T;
export declare function getAcceptedTypesForField<T>(type: GenericConstructor<T>, field: string): any[];
export declare function reduce<T, U>(type: GenericConstructor<T>, callback: (accumValue: U, fieldName: string, fieldOptions: FieldOptions) => U, initialValue: U): U;
export declare function getTextRepresentation<T>(type: GenericConstructor<T>): string;

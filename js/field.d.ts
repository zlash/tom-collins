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
import * as Parse from "./parse";
export declare function Field(options?: Parse.ParseOptionsI | Parse.Constraints): (target: any, propertyKey: string | symbol) => void;
export declare type GenericConstructor<T> = {
    new (...args: any[]): T;
};
export declare function checkIfTypeHasFieldsMetadata<T>(type: GenericConstructor<T>): boolean;
export declare function parse<T>(type: GenericConstructor<T>, obj: any): T;
export declare function reduce<T, U>(type: GenericConstructor<T>, callback: (accumValue: U, fieldName: string, type?: any, fieldOptions?: Parse.ParseOptionsI) => U, initialValue: U): U;

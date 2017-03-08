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
import * as Parse from "./parse";
/**********************************
 * Strings
 **********************************/
export declare function parseString(value: any, constraints?: Parse.StringConstraints): String;
export declare function parseStringNotEmpty(value: any, constraints?: Parse.StringConstraints): String;
export declare function parseStringPattern(value: any, pattern: Parse.StringConstraintPattern, constraints?: Parse.StringConstraints): String;
export declare function parseEmail(value: any, constraints?: Parse.StringConstraints): String;
export declare function parseNotWhitespace(value: any, constraints?: Parse.StringConstraints): String;
/**********************************
 * Booleans
 **********************************/
export declare function parseBoolean(value: any, constraints?: Parse.StringConstraints): Boolean;
/**********************************
 * Dates
 **********************************/
export declare function parseDate(value: any, constraints?: Parse.StringConstraints): Date;
export declare function parseCustomDate(value: any, format: string, nonStrict?: boolean, constraints?: Parse.StringConstraints): Date;
/**********************************
 * Numbers
 **********************************/
export declare function parseFloat(value: any, constraints?: Parse.NumberConstraints): Number;
export declare function parsePositiveFloat(value: any, constraints?: Parse.NumberConstraints): Number;
export declare function parsePositiveNotZeroFloat(value: any, constraints?: Parse.NumberConstraints): Number;
export declare function parseNegativeFloat(value: any, constraints?: Parse.NumberConstraints): Number;
export declare function parseNegativeNotZeroFloat(value: any, constraints?: Parse.NumberConstraints): Number;
export declare function parseInteger(value: any, constraints?: Parse.NumberConstraints): {};
export declare function parsePositiveInteger(value: any, constraints?: Parse.NumberConstraints): {};
export declare function parsePositiveNotZeroInteger(value: any, constraints?: Parse.NumberConstraints): {};
export declare function parseNegativeInteger(value: any, constraints?: Parse.NumberConstraints): {};
export declare function parseNegativeNotZeroInteger(value: any, constraints?: Parse.NumberConstraints): {};
/**********************************
 * Arrays
 **********************************/
export declare function parseArray(value: any, underlyingPO: Parse.ParseOptionsI, constraints?: Parse.ArrayConstraints): any[];

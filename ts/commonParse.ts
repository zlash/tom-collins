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
import * as CPO from "./commonParseOptions";

/**********************************
 * Strings
 **********************************/

export function parseString(value: any, constraints?: Parse.StringConstraints): string {
    return Parse.parseValue(CPO.string(constraints), value) as string;
}

export function parseStringNotEmpty(value: any, constraints?: Parse.StringConstraints): string {
    return Parse.parseValue(CPO.stringNotEmpty(constraints), value) as string;
}

export function parseStringPattern(value: any, pattern: Parse.StringConstraintPattern, constraints?: Parse.StringConstraints): string {
    return Parse.parseValue(CPO.stringPattern(pattern, constraints), value) as string;
}

export function parseEmail(value: any, constraints?: Parse.StringConstraints): string {
    return Parse.parseValue(CPO.email(constraints), value) as string;
}

export function parseNotWhitespace(value: any, constraints?: Parse.StringConstraints): string {
    return Parse.parseValue(CPO.notWhitespace(constraints), value) as string;
}

export function parseUrl(value: any, constraints?: Parse.StringConstraints): string {
    return Parse.parseValue(CPO.url(constraints), value) as string;
}

export function parseUUID(value: any, constraints?: Parse.StringConstraints): string {
    return Parse.parseValue(CPO.uuid(constraints), value) as string;
}

/**********************************
 * Booleans
 **********************************/

export function parseBoolean(value: any, constraints?: Parse.StringConstraints): boolean {
    return Parse.parseValue(CPO.boolean(constraints), value) as boolean;
}

/**********************************
 * Dates
 **********************************/

export function parseDate(value: any, constraints?: Parse.StringConstraints) {
    return Parse.parseValue(CPO.date(constraints), value);
}

export function parseCustomDate(value: any, format: string, nonStrict = false, constraints?: Parse.StringConstraints) {
    return Parse.parseValue(CPO.customDate(format, nonStrict, constraints), value);
}

/**********************************
 * Numbers
 **********************************/

export function parseFloat(value: any, constraints?: Parse.NumberConstraints): number {
    return Parse.parseValue(CPO.float(constraints), value) as number;
}

export function parseCustomSeparatorsFloat(value: any, decimalSeparator = ".", thousandSeparator = "", constraints?: Parse.NumberConstraints): number {
    return Parse.parseValue(CPO.customSeparatorsFloat(decimalSeparator, thousandSeparator, constraints), value) as number;
}

export function parsePositiveFloat(value: any, constraints?: Parse.NumberConstraints): number {
    return Parse.parseValue(CPO.positiveFloat(constraints), value) as number;
}

export function parsePositiveNotZeroFloat(value: any, constraints?: Parse.NumberConstraints): number {
    return Parse.parseValue(CPO.positiveNotZeroFloat(constraints), value) as number;
}

export function parseNegativeFloat(value: any, constraints?: Parse.NumberConstraints): number {
    return Parse.parseValue(CPO.negativeFloat(constraints), value) as number;
}

export function parseNegativeNotZeroFloat(value: any, constraints?: Parse.NumberConstraints): number {
    return Parse.parseValue(CPO.negativeNotZeroFloat(constraints), value) as number;
}

export function parseLatitude(value: any, constraints?: Parse.NumberConstraints): number {
    return Parse.parseValue(CPO.latitude(constraints), value) as number;
}

export function parseLongitude(value: any, constraints?: Parse.NumberConstraints): number {
    return Parse.parseValue(CPO.longitude(constraints), value) as number;
}

export function parseInteger(value: any, constraints?: Parse.NumberConstraints): number {
    return Parse.parseValue(CPO.integer(CPO.float, constraints), value) as number;
}

export function parsePositiveInteger(value: any, constraints?: Parse.NumberConstraints): number {
    return Parse.parseValue(CPO.integer(CPO.positiveFloat, constraints), value) as number;
}

export function parsePositiveNotZeroInteger(value: any, constraints?: Parse.NumberConstraints): number {
    return Parse.parseValue(CPO.integer(CPO.positiveNotZeroFloat, constraints), value) as number;
}

export function parseNegativeInteger(value: any, constraints?: Parse.NumberConstraints): number {
    return Parse.parseValue(CPO.integer(CPO.negativeFloat, constraints), value) as number;
}

export function parseNegativeNotZeroInteger(value: any, constraints?: Parse.NumberConstraints): number {
    return Parse.parseValue(CPO.integer(CPO.negativeNotZeroFloat, constraints), value) as number;
}

/**********************************
 * Arrays
 **********************************/

export function parseArray(value: any, underlyingPO: Parse.ParseOptionsI, constraints?: Parse.ArrayConstraints) {
    return Parse.parseValue(CPO.array(underlyingPO, constraints), value);
}


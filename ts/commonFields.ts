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

import * as F from "./field";
import * as Parse from "./parse";
import * as CPO from "./commonParseOptions";

/**********************************
 * Strings
 **********************************/

export function StringField(constraints?: Parse.StringConstraints) {
    return F.Field(CPO.string(constraints));
}

export function StringNotEmpty(constraints?: Parse.StringConstraints) {
    return F.Field(CPO.stringNotEmpty(constraints));
}

export function StringPattern(pattern: Parse.StringConstraintPattern, constraints?: Parse.StringConstraints) {
    return F.Field(CPO.stringPattern(pattern, constraints));
}

export function Email(constraints?: Parse.StringConstraints) {
    return F.Field(CPO.email(constraints));
}

export function NotWhitespace(constraints?: Parse.StringConstraints) {
    return F.Field(CPO.notWhitespace(constraints));
}

export function Url(constraints?: Parse.StringConstraints) {
    return F.Field(CPO.url(constraints));
}

export function UUID(constraints?: Parse.StringConstraints) {
    return F.Field(CPO.uuid(constraints));
}

/**********************************
 * Booleans
 **********************************/

export function BooleanField(constraints?: Parse.StringConstraints) {
    return F.Field(CPO.boolean(constraints));
}

/**********************************
 * Dates
 **********************************/

export function DateField(constraints?: Parse.StringConstraints) {
    return F.Field(CPO.date(constraints));
}

export function CustomDate(format: string, nonStrict = false, constraints?: Parse.StringConstraints) {
    return F.Field(CPO.customDate(format, nonStrict, constraints));
}

/**********************************
 * Numbers
 **********************************/

export function Float(constraints?: Parse.NumberConstraints) {
    return F.Field(CPO.float(constraints));
}

export function PositiveFloat(constraints?: Parse.NumberConstraints) {
    return F.Field(CPO.positiveFloat(constraints));
}

export function PositiveNotZeroFloat(constraints?: Parse.NumberConstraints) {
    return F.Field(CPO.positiveNotZeroFloat(constraints));
}

export function NegativeFloat(constraints?: Parse.NumberConstraints) {
    return F.Field(CPO.negativeFloat(constraints));
}

export function NegativeNotZeroFloat(constraints?: Parse.NumberConstraints) {
    return F.Field(CPO.negativeNotZeroFloat(constraints));
}

export function Latitude(constraints?: Parse.NumberConstraints) {
    return F.Field(CPO.latitude(constraints));
}

export function Longitude(constraints?: Parse.NumberConstraints) {
    return F.Field(CPO.longitude(constraints));
}

export function Integer(constraints?: Parse.NumberConstraints) {
    return F.Field(CPO.integer(CPO.float, constraints));
}

export function PositiveInteger(constraints?: Parse.NumberConstraints) {
    return F.Field(CPO.integer(CPO.positiveFloat, constraints));
}

export function PositiveNotZeroInteger(constraints?: Parse.NumberConstraints) {
    return F.Field(CPO.integer(CPO.positiveNotZeroFloat, constraints));
}

export function NegativeInteger(constraints?: Parse.NumberConstraints) {
    return F.Field(CPO.integer(CPO.negativeFloat, constraints));
}

export function NegativeNotZeroInteger(constraints?: Parse.NumberConstraints) {
    return F.Field(CPO.integer(CPO.negativeNotZeroFloat, constraints));
}

/**********************************
 * Arrays
 **********************************/

export function ArrayField(underlyingPO: Parse.ParseOptionsI, constraints?: Parse.ArrayConstraints) {
    return F.Field(CPO.array(underlyingPO, constraints));
}


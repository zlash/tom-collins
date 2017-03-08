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
const F = require("./field");
const CPO = require("./commonParseOptions");
/**********************************
 * Strings
 **********************************/
function StringField(constraints) {
    return F.Field(CPO.string(constraints));
}
exports.StringField = StringField;
function StringNotEmpty(constraints) {
    return F.Field(CPO.stringNotEmpty(constraints));
}
exports.StringNotEmpty = StringNotEmpty;
function StringPattern(pattern, constraints) {
    return F.Field(CPO.stringPattern(pattern, constraints));
}
exports.StringPattern = StringPattern;
function Email(constraints) {
    return F.Field(CPO.stringEmail(constraints));
}
exports.Email = Email;
function NotWhitespace(constraints) {
    return F.Field(CPO.stringNotWhitespace(constraints));
}
exports.NotWhitespace = NotWhitespace;
/**********************************
 * Booleans
 **********************************/
function BooleanField(constraints) {
    return F.Field(CPO.boolean(constraints));
}
exports.BooleanField = BooleanField;
/**********************************
 * Dates
 **********************************/
function DateField(constraints) {
    return F.Field(CPO.date(constraints));
}
exports.DateField = DateField;
function CustomDate(format, nonStrict = false, constraints) {
    return F.Field(CPO.customDate(format, nonStrict, constraints));
}
exports.CustomDate = CustomDate;
/**********************************
 * Numbers
 **********************************/
function Float(constraints) {
    return F.Field(CPO.float(constraints));
}
exports.Float = Float;
function PositiveFloat(constraints) {
    return F.Field(CPO.positiveFloat(constraints));
}
exports.PositiveFloat = PositiveFloat;
function PositiveNotZeroFloat(constraints) {
    return F.Field(CPO.positiveNotZeroFloat(constraints));
}
exports.PositiveNotZeroFloat = PositiveNotZeroFloat;
function NegativeFloat(constraints) {
    return F.Field(CPO.negativeFloat(constraints));
}
exports.NegativeFloat = NegativeFloat;
function NegativeNotZeroFloat(constraints) {
    return F.Field(CPO.negativeNotZeroFloat(constraints));
}
exports.NegativeNotZeroFloat = NegativeNotZeroFloat;
function Integer(constraints) {
    return F.Field(CPO.integer(CPO.float, constraints));
}
exports.Integer = Integer;
function PositiveInteger(constraints) {
    return F.Field(CPO.integer(CPO.positiveFloat, constraints));
}
exports.PositiveInteger = PositiveInteger;
function PositiveNotZeroInteger(constraints) {
    return F.Field(CPO.integer(CPO.positiveNotZeroFloat, constraints));
}
exports.PositiveNotZeroInteger = PositiveNotZeroInteger;
function NegativeInteger(constraints) {
    return F.Field(CPO.integer(CPO.negativeFloat, constraints));
}
exports.NegativeInteger = NegativeInteger;
function NegativeNotZeroInteger(constraints) {
    return F.Field(CPO.integer(CPO.negativeNotZeroFloat, constraints));
}
exports.NegativeNotZeroInteger = NegativeNotZeroInteger;
/**********************************
 * Arrays
 **********************************/
function ArrayField(underlyingPO, constraints) {
    return F.Field(CPO.array(underlyingPO, constraints));
}
exports.ArrayField = ArrayField;
//# sourceMappingURL=commonFields.js.map
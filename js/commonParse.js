"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const Parse = require("./parse");
const CPO = require("./commonParseOptions");
/**********************************
 * Strings
 **********************************/
function parseString(value, constraints) {
    return Parse.parseValue(CPO.string(constraints), value);
}
exports.parseString = parseString;
function parseStringNotEmpty(value, constraints) {
    return Parse.parseValue(CPO.stringNotEmpty(constraints), value);
}
exports.parseStringNotEmpty = parseStringNotEmpty;
function parseStringPattern(value, pattern, constraints) {
    return Parse.parseValue(CPO.stringPattern(pattern, constraints), value);
}
exports.parseStringPattern = parseStringPattern;
function parseEmail(value, constraints) {
    return Parse.parseValue(CPO.email(constraints), value);
}
exports.parseEmail = parseEmail;
function parseNotWhitespace(value, constraints) {
    return Parse.parseValue(CPO.notWhitespace(constraints), value);
}
exports.parseNotWhitespace = parseNotWhitespace;
function parseUrl(value, constraints) {
    return Parse.parseValue(CPO.url(constraints), value);
}
exports.parseUrl = parseUrl;
function parseUUID(value, constraints) {
    return Parse.parseValue(CPO.uuid(constraints), value);
}
exports.parseUUID = parseUUID;
/**********************************
 * Booleans
 **********************************/
function parseBoolean(value, constraints) {
    return Parse.parseValue(CPO.boolean(constraints), value);
}
exports.parseBoolean = parseBoolean;
/**********************************
 * Dates
 **********************************/
function parseDate(value, constraints) {
    return Parse.parseValue(CPO.date(constraints), value);
}
exports.parseDate = parseDate;
function parseCustomDate(value, format, nonStrict = false, constraints) {
    return Parse.parseValue(CPO.customDate(format, nonStrict, constraints), value);
}
exports.parseCustomDate = parseCustomDate;
/**********************************
 * Numbers
 **********************************/
function parseFloat(value, constraints) {
    return Parse.parseValue(CPO.float(constraints), value);
}
exports.parseFloat = parseFloat;
function parseCustomSeparatorsFloat(value, decimalSeparator = ".", thousandSeparator = "", constraints) {
    return Parse.parseValue(CPO.customSeparatorsFloat(decimalSeparator, thousandSeparator, constraints), value);
}
exports.parseCustomSeparatorsFloat = parseCustomSeparatorsFloat;
function parsePositiveFloat(value, constraints) {
    return Parse.parseValue(CPO.positiveFloat(constraints), value);
}
exports.parsePositiveFloat = parsePositiveFloat;
function parsePositiveNotZeroFloat(value, constraints) {
    return Parse.parseValue(CPO.positiveNotZeroFloat(constraints), value);
}
exports.parsePositiveNotZeroFloat = parsePositiveNotZeroFloat;
function parseNegativeFloat(value, constraints) {
    return Parse.parseValue(CPO.negativeFloat(constraints), value);
}
exports.parseNegativeFloat = parseNegativeFloat;
function parseNegativeNotZeroFloat(value, constraints) {
    return Parse.parseValue(CPO.negativeNotZeroFloat(constraints), value);
}
exports.parseNegativeNotZeroFloat = parseNegativeNotZeroFloat;
function parseLatitude(value, constraints) {
    return Parse.parseValue(CPO.latitude(constraints), value);
}
exports.parseLatitude = parseLatitude;
function parseLongitude(value, constraints) {
    return Parse.parseValue(CPO.longitude(constraints), value);
}
exports.parseLongitude = parseLongitude;
function parseInteger(value, constraints) {
    return Parse.parseValue(CPO.integer(CPO.float, constraints), value);
}
exports.parseInteger = parseInteger;
function parsePositiveInteger(value, constraints) {
    return Parse.parseValue(CPO.integer(CPO.positiveFloat, constraints), value);
}
exports.parsePositiveInteger = parsePositiveInteger;
function parsePositiveNotZeroInteger(value, constraints) {
    return Parse.parseValue(CPO.integer(CPO.positiveNotZeroFloat, constraints), value);
}
exports.parsePositiveNotZeroInteger = parsePositiveNotZeroInteger;
function parseNegativeInteger(value, constraints) {
    return Parse.parseValue(CPO.integer(CPO.negativeFloat, constraints), value);
}
exports.parseNegativeInteger = parseNegativeInteger;
function parseNegativeNotZeroInteger(value, constraints) {
    return Parse.parseValue(CPO.integer(CPO.negativeNotZeroFloat, constraints), value);
}
exports.parseNegativeNotZeroInteger = parseNegativeNotZeroInteger;
/**********************************
 * Arrays
 **********************************/
function parseArray(value, underlyingPO, constraints) {
    return Parse.parseValue(CPO.array(underlyingPO, constraints), value);
}
exports.parseArray = parseArray;
//# sourceMappingURL=commonParse.js.map
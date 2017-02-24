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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
const TC = require("./tom-collins");
const Maps = require("./maps");
const Fields = require("./fields");
const Patterns = require("./patterns");
function parseStringNotEmpty(value, required, maxLength, pattern) {
    return StringBase(individualParser(String), required, 1, maxLength, pattern)(value);
}
exports.parseStringNotEmpty = parseStringNotEmpty;
function StringNotEmpty(required, maxLength, pattern) {
    return StringField(required, 1, maxLength, pattern);
}
exports.StringNotEmpty = StringNotEmpty;
function parseStringNotWhitespace(value, required, maxLength) {
    return StringBase(individualParser(String), required, 1, maxLength, Patterns.PredefinedPatterns.notWhitespace)(value);
}
exports.parseStringNotWhitespace = parseStringNotWhitespace;
function StringNotWhitespace(required, maxLength) {
    return StringField(required, 1, maxLength, Patterns.PredefinedPatterns.notWhitespace);
}
exports.StringNotWhitespace = StringNotWhitespace;
function parseEmail(value, required) {
    return StringBase(individualParser(String), required, 1, undefined, Patterns.PredefinedPatterns.email)(value);
}
exports.parseEmail = parseEmail;
function Email(required) {
    return StringField(required, 1, undefined, Patterns.PredefinedPatterns.email);
}
exports.Email = Email;
function parseStringPattern(value, pattern, required, minLength, maxLength) {
    return StringBase(individualParser(String), required, minLength, maxLength, pattern)(value);
}
exports.parseStringPattern = parseStringPattern;
function StringPattern(pattern, required, minLength, maxLength) {
    return StringField(required, minLength, maxLength, pattern);
}
exports.StringPattern = StringPattern;
function parseString(value, required, minLength, maxLength, pattern) {
    return StringBase(individualParser(String), required, minLength, maxLength, pattern)(value);
}
exports.parseString = parseString;
function StringField(required, minLength, maxLength, pattern) {
    return StringBase(TC.Field, required, minLength, maxLength, pattern);
}
exports.StringField = StringField;
function StringBase(t, required, minLength, maxLength, pattern) {
    return t({
        required: required,
        maps: Maps.PredefinedMaps.anyToString,
        typeConstraints: {
            minLength: minLength,
            maxLength: maxLength,
            pattern: pattern
        }
    });
}
exports.StringBase = StringBase;
function parseBoolean(value, required) {
    return BooleanBase(individualParser(Boolean), required)(value);
}
exports.parseBoolean = parseBoolean;
function BooleanField(required) {
    return BooleanBase(TC.Field, required);
}
exports.BooleanField = BooleanField;
function BooleanBase(t, required) {
    return t({
        required: required,
        maps: [
            Maps.PredefinedMaps.stringToBoolean,
            Maps.PredefinedMaps.numberToBoolean
        ]
    });
}
exports.BooleanBase = BooleanBase;
function parseDate(value, required) {
    return DateBase(individualParser(Date), required)(value);
}
exports.parseDate = parseDate;
function DateField(required) {
    return DateBase(TC.Field, required);
}
exports.DateField = DateField;
function DateBase(t, required) {
    return t({
        required: required,
        maps: [
            Maps.PredefinedMaps.stringToDate
        ]
    });
}
exports.DateBase = DateBase;
function parseCustomDate(value, format, required = true, nonStrict = false) {
    return CustomDateBase(individualParser(Date), format, required, nonStrict)(value);
}
exports.parseCustomDate = parseCustomDate;
function CustomDate(format, required = true, nonStrict = false) {
    return CustomDateBase(TC.Field, format, required, nonStrict);
}
exports.CustomDate = CustomDate;
function CustomDateBase(t, format, required = true, nonStrict = false) {
    return t({
        required: required,
        maps: [
            Maps.PredefinedMaps.stringToCustomDate(format, nonStrict)
        ]
    });
}
exports.CustomDateBase = CustomDateBase;
function individualParser(targetType) {
    return (options) => {
        return (value) => {
            return Fields.parseValue(targetType, value, __assign({}, options.typeConstraints, { optional: (options.required === false) }), options.maps);
        };
    };
}
//# sourceMappingURL=commonFields.js.map
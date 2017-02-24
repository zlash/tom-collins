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
function StringNotEmpty(required, maxLength, pattern) {
    return StringField(required, 1, maxLength, pattern);
}
exports.StringNotEmpty = StringNotEmpty;
function StringNotWhitespace(required, maxLength) {
    return StringField(required, 1, maxLength, Patterns.PredefinedPatterns.notWhitespace);
}
exports.StringNotWhitespace = StringNotWhitespace;
function Email(required) {
    return StringField(required, 1, undefined, Patterns.PredefinedPatterns.email);
}
exports.Email = Email;
function StringPattern(pattern, required, minLength, maxLength) {
    return StringField(required, minLength, maxLength, pattern);
}
exports.StringPattern = StringPattern;
function StringField(required, minLength, maxLength, pattern) {
    return TC.Field({
        required: required,
        typeConstraints: {
            minLength: minLength,
            maxLength: maxLength,
            pattern: pattern
        }
    });
}
exports.StringField = StringField;
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
function individualParser(targetType) {
    return (options) => {
        return (value) => {
            return Fields.parseValue(targetType, value, __assign({}, options.typeConstraints, { optional: (options.required === false) }), options.maps);
        };
    };
}
function DateField(required) {
    return TC.Field({
        required: required,
        maps: [
            Maps.PredefinedMaps.stringToDate
        ]
    });
}
exports.DateField = DateField;
function CustomDate(format, required = true, nonStrict = false) {
    return TC.Field({
        required: required,
        maps: [
            Maps.PredefinedMaps.stringToCustomDate(format, nonStrict)
        ]
    });
}
exports.CustomDate = CustomDate;
//# sourceMappingURL=commonFields.js.map
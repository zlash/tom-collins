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
const TC = require("./tom-collins");
const Maps = require("./maps");
const Patterns = require("./patterns");
function StringNotEmpty(required, maxLength, pattern) {
    return String(required, 1, maxLength, pattern);
}
exports.StringNotEmpty = StringNotEmpty;
function StringNotWhitespace(required, maxLength) {
    return String(required, 1, maxLength, Patterns.PredefinedPatterns.notWhitespace);
}
exports.StringNotWhitespace = StringNotWhitespace;
function Email(required) {
    return String(required, 1, undefined, Patterns.PredefinedPatterns.email);
}
exports.Email = Email;
function StringPattern(pattern, required, minLength, maxLength) {
    return String(required, minLength, maxLength, pattern);
}
exports.StringPattern = StringPattern;
function String(required, minLength, maxLength, pattern) {
    return TC.Field({
        required: required,
        typeConstraints: {
            minLength: minLength,
            maxLength: maxLength,
            pattern: pattern
        }
    });
}
exports.String = String;
function Boolean(required) {
    return TC.Field({
        required: required,
        maps: [
            Maps.PredefinedMaps.stringToBoolean,
            Maps.PredefinedMaps.numberToBoolean
        ]
    });
}
exports.Boolean = Boolean;
function Date(required) {
    return TC.Field({
        required: required,
        maps: [
            Maps.PredefinedMaps.stringToDate
        ]
    });
}
exports.Date = Date;
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
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
const Maps = require("./maps");
const Patterns = require("./patterns");
/**********************************
 * Strings
 **********************************/
function string(constraints) {
    return {
        targetType: String,
        constraints: constraints,
        maps: Maps.PredefinedMaps.anyToString,
    };
}
exports.string = string;
function stringNotEmpty(constraints) {
    constraints = constraints || {};
    constraints.minLength = 1;
    return string(constraints);
}
exports.stringNotEmpty = stringNotEmpty;
function stringPattern(pattern, constraints) {
    constraints = constraints || {};
    constraints.pattern = pattern;
    return string(constraints);
}
exports.stringPattern = stringPattern;
function email(constraints) {
    return stringPattern(Patterns.PredefinedPatterns.email, constraints);
}
exports.email = email;
function notWhitespace(constraints) {
    return stringPattern(Patterns.PredefinedPatterns.notWhitespace, constraints);
}
exports.notWhitespace = notWhitespace;
function url(constraints) {
    return stringPattern(Patterns.PredefinedPatterns.url, constraints);
}
exports.url = url;
function uuid(constraints) {
    return stringPattern(Patterns.PredefinedPatterns.uuid, constraints);
}
exports.uuid = uuid;
/**********************************
 * Booleans
 **********************************/
function boolean(constraints) {
    return {
        targetType: Boolean,
        constraints: constraints,
        maps: [
            Maps.PredefinedMaps.stringToBoolean,
            Maps.PredefinedMaps.numberToBoolean
        ]
    };
}
exports.boolean = boolean;
/**********************************
 * Dates
 **********************************/
function date(constraints) {
    return {
        targetType: Date,
        constraints: constraints,
        maps: [
            Maps.PredefinedMaps.anyToDate
        ]
    };
}
exports.date = date;
function customDate(format, nonStrict = false, constraints) {
    return {
        targetType: Date,
        constraints: constraints,
        maps: [
            Maps.PredefinedMaps.stringToCustomDate(format, nonStrict)
        ]
    };
}
exports.customDate = customDate;
/**********************************
 * Numbers
 **********************************/
function float(constraints) {
    return {
        targetType: Number,
        constraints: constraints,
        maps: Maps.PredefinedMaps.stringToNumber,
    };
}
exports.float = float;
function customSeparatorsFloat(decimalSeparators = ".", thousandSeparators = "", constraints) {
    return {
        targetType: Number,
        constraints: constraints,
        maps: Maps.PredefinedMaps.stringToNumberWithCustomSeparators(decimalSeparators, thousandSeparators)
    };
}
exports.customSeparatorsFloat = customSeparatorsFloat;
function positiveFloat(constraints) {
    constraints = constraints || {};
    constraints.minimum = (constraints.minimum && constraints.minimum > 0) ? constraints.minimum : 0;
    return float(constraints);
}
exports.positiveFloat = positiveFloat;
function positiveNotZeroFloat(constraints) {
    constraints = constraints || {};
    constraints.minimum = (constraints.minimum && constraints.minimum > 0) ? constraints.minimum : 0;
    constraints.exclusiveMinimum = true;
    return float(constraints);
}
exports.positiveNotZeroFloat = positiveNotZeroFloat;
function negativeFloat(constraints) {
    constraints = constraints || {};
    constraints.maximum = (constraints.maximum && constraints.maximum < 0) ? constraints.maximum : 0;
    return float(constraints);
}
exports.negativeFloat = negativeFloat;
function negativeNotZeroFloat(constraints) {
    constraints = constraints || {};
    constraints.maximum = (constraints.maximum && constraints.maximum < 0) ? constraints.maximum : 0;
    constraints.exclusiveMaximum = true;
    return float(constraints);
}
exports.negativeNotZeroFloat = negativeNotZeroFloat;
function latitude(constraints) {
    constraints = constraints || {};
    constraints.minimum = (constraints.minimum && constraints.minimum > -90) ? constraints.minimum : -90;
    constraints.maximum = (constraints.maximum && constraints.maximum < 90) ? constraints.maximum : 90;
    return float(constraints);
}
exports.latitude = latitude;
function longitude(constraints) {
    constraints = constraints || {};
    constraints.minimum = (constraints.minimum && constraints.minimum > -180) ? constraints.minimum : -180;
    constraints.maximum = (constraints.maximum && constraints.maximum < 180) ? constraints.maximum : 180;
    return float(constraints);
}
exports.longitude = longitude;
function integer(floatCPOGenerator, constraints) {
    constraints = constraints || {};
    constraints.multipleOf = constraints.multipleOf || 1;
    if (Math.floor(constraints.multipleOf) !== constraints.multipleOf) {
        throw new Error("multipleOf for integer values must be an integer.");
    }
    return floatCPOGenerator(constraints);
}
exports.integer = integer;
/**********************************
 * Arrays
 **********************************/
function array(underlyingPO, constraints) {
    constraints = constraints || {};
    constraints.underlyingTypeParseOptions = underlyingPO;
    return {
        targetType: Array,
        constraints: constraints
    };
}
exports.array = array;
//# sourceMappingURL=commonParseOptions.js.map
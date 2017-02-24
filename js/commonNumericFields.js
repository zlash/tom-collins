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
function NegativeIntegerNotZero(required, min, exclusiveMin, multipleOf, max, exclusiveMax) {
    return NegativeNumberNotZero(Integer, required, min, exclusiveMin, multipleOf, max, exclusiveMax);
}
exports.NegativeIntegerNotZero = NegativeIntegerNotZero;
function PositiveIntegerNotZero(required, max, exclusiveMax, multipleOf, min, exclusiveMin) {
    return PositiveNumberNotZero(Integer, required, max, exclusiveMax, multipleOf, min, exclusiveMin);
}
exports.PositiveIntegerNotZero = PositiveIntegerNotZero;
function NegativeInteger(required, min, exclusiveMin, multipleOf, max, exclusiveMax) {
    return NegativeNumber(Integer, required, min, exclusiveMin, multipleOf, max, exclusiveMax);
}
exports.NegativeInteger = NegativeInteger;
function PositiveInteger(required, max, exclusiveMax, multipleOf, min, exclusiveMin) {
    return PositiveNumber(Integer, required, max, exclusiveMax, multipleOf, min, exclusiveMin);
}
exports.PositiveInteger = PositiveInteger;
function NegativeFloatNotZero(required, min, exclusiveMin, multipleOf, max, exclusiveMax) {
    return NegativeNumberNotZero(Float, required, min, exclusiveMin, multipleOf, max, exclusiveMax);
}
exports.NegativeFloatNotZero = NegativeFloatNotZero;
function PositiveFloatNotZero(required, max, exclusiveMax, multipleOf, min, exclusiveMin) {
    return PositiveNumberNotZero(Float, required, max, exclusiveMax, multipleOf, min, exclusiveMin);
}
exports.PositiveFloatNotZero = PositiveFloatNotZero;
function NegativeFloat(required, min, exclusiveMin, multipleOf, max, exclusiveMax) {
    return NegativeNumber(Float, required, min, exclusiveMin, multipleOf, max, exclusiveMax);
}
exports.NegativeFloat = NegativeFloat;
function PositiveFloat(required, max, exclusiveMax, multipleOf, min, exclusiveMin) {
    return PositiveNumber(Float, required, max, exclusiveMax, multipleOf, min, exclusiveMin);
}
exports.PositiveFloat = PositiveFloat;
function Integer(required, min, max, exclusiveMin, exclusiveMax, multipleOf) {
    return IntegerBase(TC.Field, required, min, max, exclusiveMin, exclusiveMax, multipleOf);
}
exports.Integer = Integer;
function Float(required, min, max, exclusiveMin, exclusiveMax, multipleOf) {
    return FloatBase(TC.Field, required, min, max, exclusiveMin, exclusiveMax, multipleOf);
}
exports.Float = Float;
// Direct parse functions
function parseNegativeIntegerNotZero(value, required, min, exclusiveMin, multipleOf, max, exclusiveMax) {
    return NegativeNumberNotZero(integerParser, required, min, exclusiveMin, multipleOf, max, exclusiveMax)(value);
}
exports.parseNegativeIntegerNotZero = parseNegativeIntegerNotZero;
function parsePositiveIntegerNotZero(value, required, max, exclusiveMax, multipleOf, min, exclusiveMin) {
    return PositiveNumberNotZero(integerParser, required, max, exclusiveMax, multipleOf, min, exclusiveMin)(value);
}
exports.parsePositiveIntegerNotZero = parsePositiveIntegerNotZero;
function parseNegativeInteger(value, required, min, exclusiveMin, multipleOf, max, exclusiveMax) {
    return NegativeNumber(integerParser, required, min, exclusiveMin, multipleOf, max, exclusiveMax)(value);
}
exports.parseNegativeInteger = parseNegativeInteger;
function parsePositiveInteger(value, required, max, exclusiveMax, multipleOf, min, exclusiveMin) {
    return PositiveNumber(integerParser, required, max, exclusiveMax, multipleOf, min, exclusiveMin)(value);
}
exports.parsePositiveInteger = parsePositiveInteger;
function parseNegativeFloatNotZero(value, required, min, exclusiveMin, multipleOf, max, exclusiveMax) {
    return NegativeNumberNotZero(floatParser, required, min, exclusiveMin, multipleOf, max, exclusiveMax)(value);
}
exports.parseNegativeFloatNotZero = parseNegativeFloatNotZero;
function parsePositiveFloatNotZero(value, required, max, exclusiveMax, multipleOf, min, exclusiveMin) {
    return PositiveNumberNotZero(floatParser, required, max, exclusiveMax, multipleOf, min, exclusiveMin)(value);
}
exports.parsePositiveFloatNotZero = parsePositiveFloatNotZero;
function parseNegativeFloat(value, required, min, exclusiveMin, multipleOf, max, exclusiveMax) {
    return NegativeNumber(floatParser, required, min, exclusiveMin, multipleOf, max, exclusiveMax)(value);
}
exports.parseNegativeFloat = parseNegativeFloat;
function parsePositiveFloat(value, required, max, exclusiveMax, multipleOf, min, exclusiveMin) {
    return PositiveNumber(floatParser, required, max, exclusiveMax, multipleOf, min, exclusiveMin)(value);
}
exports.parsePositiveFloat = parsePositiveFloat;
function parseInteger(value, required, min, max, exclusiveMin, exclusiveMax, multipleOf) {
    return integerParser(required, min, max, exclusiveMin, exclusiveMax, multipleOf)(value);
}
exports.parseInteger = parseInteger;
function integerParser(required, min, max, exclusiveMin, exclusiveMax, multipleOf) {
    return IntegerBase(individualNumericParser, required, min, max, exclusiveMin, exclusiveMax, multipleOf);
}
function parseFloat(value, required, min, max, exclusiveMin, exclusiveMax, multipleOf) {
    return floatParser(required, min, max, exclusiveMin, exclusiveMax, multipleOf)(value);
}
exports.parseFloat = parseFloat;
function floatParser(required, min, max, exclusiveMin, exclusiveMax, multipleOf) {
    return FloatBase(individualNumericParser, required, min, max, exclusiveMin, exclusiveMax, multipleOf);
}
function individualNumericParser(options) {
    return (value) => {
        return Fields.parseValue(Number, value, __assign({}, options.typeConstraints, { optional: (options.required === false) }), options.maps);
    };
}
function IntegerBase(target, required, min, max, exclusiveMin, exclusiveMax, multipleOf) {
    if (multipleOf == undefined) {
        multipleOf = 1.0;
    }
    if (Math.floor(multipleOf) !== multipleOf) {
        throw new Error("MultipleOf for integer values must be an integer.");
    }
    return FloatBase(target, required, min, max, exclusiveMin, exclusiveMax, multipleOf);
}
function FloatBase(target, required, min, max, exclusiveMin, exclusiveMax, multipleOf) {
    return target({
        required: required,
        maps: Maps.PredefinedMaps.stringToNumber,
        typeConstraints: {
            multipleOf: multipleOf,
            minimum: min,
            exclusiveMinimum: exclusiveMin,
            maximum: max,
            exclusiveMaximum: exclusiveMax
        }
    });
}
function NegativeNumberNotZero(fielder, required, min, exclusiveMin, multipleOf, max, exclusiveMax) {
    max = max == undefined ? 0 : Math.min(0, max);
    exclusiveMax = exclusiveMax || max === 0;
    return fielder(required, min, max, exclusiveMin, exclusiveMax, multipleOf);
}
function PositiveNumberNotZero(fielder, required, max, exclusiveMax, multipleOf, min, exclusiveMin) {
    min = min == undefined ? 0 : Math.max(0, min);
    exclusiveMin = exclusiveMin || min === 0;
    return fielder(required, min, max, exclusiveMin, exclusiveMax, multipleOf);
}
function NegativeNumber(fielder, required, min, exclusiveMin, multipleOf, max, exclusiveMax) {
    max = max == undefined ? 0 : Math.min(0, max);
    return fielder(required, min, max, exclusiveMin, exclusiveMax, multipleOf);
}
function PositiveNumber(fielder, required, max, exclusiveMax, multipleOf, min, exclusiveMin) {
    min = min == undefined ? 0 : Math.max(0, min);
    return fielder(required, min, max, exclusiveMin, exclusiveMax, multipleOf);
}
//# sourceMappingURL=commonNumericFields.js.map
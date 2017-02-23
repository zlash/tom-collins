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
    if (multipleOf == undefined) {
        multipleOf = 1.0;
    }
    if (Math.floor(multipleOf) !== multipleOf) {
        throw new Error("MultipleOf for integer values must be an integer.");
    }
    return Float(required, min, max, exclusiveMin, exclusiveMax, multipleOf);
}
exports.Integer = Integer;
function Float(required, min, max, exclusiveMin, exclusiveMax, multipleOf) {
    return TC.Field({
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
exports.Float = Float;
function NegativeNumberNotZero(fielder, required, min, exclusiveMin, multipleOf, max, exclusiveMax) {
    max = Math.min(0, max);
    exclusiveMax = exclusiveMax || max === 0;
    return fielder(required, min, max, exclusiveMin, exclusiveMax, multipleOf);
}
function PositiveNumberNotZero(fielder, required, max, exclusiveMax, multipleOf, min, exclusiveMin) {
    min = Math.max(0, min);
    exclusiveMin = exclusiveMin || min === 0;
    return fielder(required, min, max, exclusiveMin, exclusiveMax, multipleOf);
}
function NegativeNumber(fielder, required, min, exclusiveMin, multipleOf, max, exclusiveMax) {
    max = Math.min(0, max);
    return fielder(required, min, max, exclusiveMin, exclusiveMax, multipleOf);
}
function PositiveNumber(fielder, required, max, exclusiveMax, multipleOf, min, exclusiveMin) {
    min = Math.max(0, min);
    return fielder(required, min, max, exclusiveMin, exclusiveMax, multipleOf);
}
//# sourceMappingURL=commonFields.js.map
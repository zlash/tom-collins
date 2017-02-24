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

import * as TC from "./tom-collins";
import * as Maps from "./maps";
import * as Fields from "./fields";

export function NegativeIntegerNotZero(required?: boolean, min?: number, exclusiveMin?: boolean, multipleOf?: number, max?: number, exclusiveMax?: boolean) {
    return NegativeNumberNotZero(Integer, required, min, exclusiveMin, multipleOf, max, exclusiveMax);
}

export function PositiveIntegerNotZero(required?: boolean, max?: number, exclusiveMax?: boolean, multipleOf?: number, min?: number, exclusiveMin?: boolean) {
    return PositiveNumberNotZero(Integer, required, max, exclusiveMax, multipleOf, min, exclusiveMin);
}

export function NegativeInteger(required?: boolean, min?: number, exclusiveMin?: boolean, multipleOf?: number, max?: number, exclusiveMax?: boolean) {
    return NegativeNumber(Integer, required, min, exclusiveMin, multipleOf, max, exclusiveMax);
}

export function PositiveInteger(required?: boolean, max?: number, exclusiveMax?: boolean, multipleOf?: number, min?: number, exclusiveMin?: boolean) {
    return PositiveNumber(Integer, required, max, exclusiveMax, multipleOf, min, exclusiveMin);
}

export function NegativeFloatNotZero(required?: boolean, min?: number, exclusiveMin?: boolean, multipleOf?: number, max?: number, exclusiveMax?: boolean) {
    return NegativeNumberNotZero(Float, required, min, exclusiveMin, multipleOf, max, exclusiveMax);
}

export function PositiveFloatNotZero(required?: boolean, max?: number, exclusiveMax?: boolean, multipleOf?: number, min?: number, exclusiveMin?: boolean) {
    return PositiveNumberNotZero(Float, required, max, exclusiveMax, multipleOf, min, exclusiveMin);
}

export function NegativeFloat(required?: boolean, min?: number, exclusiveMin?: boolean, multipleOf?: number, max?: number, exclusiveMax?: boolean) {
    return NegativeNumber(Float, required, min, exclusiveMin, multipleOf, max, exclusiveMax);
}

export function PositiveFloat(required?: boolean, max?: number, exclusiveMax?: boolean, multipleOf?: number, min?: number, exclusiveMin?: boolean) {
    return PositiveNumber(Float, required, max, exclusiveMax, multipleOf, min, exclusiveMin);
}

export function Integer(required?: boolean, min?: number, max?: number, exclusiveMin?: boolean, exclusiveMax?: boolean, multipleOf?: number) {
    return IntegerBase(TC.Field, required, min, max, exclusiveMin, exclusiveMax, multipleOf);
}

export function Float(required?: boolean, min?: number, max?: number, exclusiveMin?: boolean, exclusiveMax?: boolean, multipleOf?: number) {
    return FloatBase(TC.Field, required, min, max, exclusiveMin, exclusiveMax, multipleOf);
}


// Direct parse functions

export function parseNegativeIntegerNotZero(value: any, required?: boolean, min?: number, exclusiveMin?: boolean, multipleOf?: number, max?: number, exclusiveMax?: boolean) {
    return NegativeNumberNotZero(integerParser, required, min, exclusiveMin, multipleOf, max, exclusiveMax)(value);
}

export function parsePositiveIntegerNotZero(value: any, required?: boolean, max?: number, exclusiveMax?: boolean, multipleOf?: number, min?: number, exclusiveMin?: boolean) {
    return PositiveNumberNotZero(integerParser, required, max, exclusiveMax, multipleOf, min, exclusiveMin)(value);
}

export function parseNegativeInteger(value: any, required?: boolean, min?: number, exclusiveMin?: boolean, multipleOf?: number, max?: number, exclusiveMax?: boolean) {
    return NegativeNumber(integerParser, required, min, exclusiveMin, multipleOf, max, exclusiveMax)(value);
}

export function parsePositiveInteger(value: any, required?: boolean, max?: number, exclusiveMax?: boolean, multipleOf?: number, min?: number, exclusiveMin?: boolean) {
    return PositiveNumber(integerParser, required, max, exclusiveMax, multipleOf, min, exclusiveMin)(value);
}

export function parseNegativeFloatNotZero(value: any, required?: boolean, min?: number, exclusiveMin?: boolean, multipleOf?: number, max?: number, exclusiveMax?: boolean) {
    return NegativeNumberNotZero(floatParser, required, min, exclusiveMin, multipleOf, max, exclusiveMax)(value);
}

export function parsePositiveFloatNotZero(value: any, required?: boolean, max?: number, exclusiveMax?: boolean, multipleOf?: number, min?: number, exclusiveMin?: boolean) {
    return PositiveNumberNotZero(floatParser, required, max, exclusiveMax, multipleOf, min, exclusiveMin)(value);
}

export function parseNegativeFloat(value: any, required?: boolean, min?: number, exclusiveMin?: boolean, multipleOf?: number, max?: number, exclusiveMax?: boolean) {
    return NegativeNumber(floatParser, required, min, exclusiveMin, multipleOf, max, exclusiveMax)(value);
}

export function parsePositiveFloat(value: any, required?: boolean, max?: number, exclusiveMax?: boolean, multipleOf?: number, min?: number, exclusiveMin?: boolean) {
    return PositiveNumber(floatParser, required, max, exclusiveMax, multipleOf, min, exclusiveMin)(value);
}

export function parseInteger(value: any, required?: boolean, min?: number, max?: number, exclusiveMin?: boolean, exclusiveMax?: boolean, multipleOf?: number) {
    return integerParser(required, min, max, exclusiveMin, exclusiveMax, multipleOf);
}

function integerParser(required?: boolean, min?: number, max?: number, exclusiveMin?: boolean, exclusiveMax?: boolean, multipleOf?: number) {
    return IntegerBase(individualNumericParser, required, min, max, exclusiveMin, exclusiveMax, multipleOf);
}

export function parseFloat(value: any, required?: boolean, min?: number, max?: number, exclusiveMin?: boolean, exclusiveMax?: boolean, multipleOf?: number) {
    return floatParser(required, min, max, exclusiveMin, exclusiveMax, multipleOf)(value);
}

function floatParser(required?: boolean, min?: number, max?: number, exclusiveMin?: boolean, exclusiveMax?: boolean, multipleOf?: number) {
    return FloatBase(individualNumericParser, required, min, max, exclusiveMin, exclusiveMax, multipleOf);
}

function individualNumericParser(options: TC.FieldOptions) {
    return (value: any) => {
        return Fields.parseValue(Number, value, { ...options.typeConstraints, optional: (options.required === false) }, options.maps);
    };
}



function IntegerBase(target: any, required?: boolean, min?: number, max?: number, exclusiveMin?: boolean, exclusiveMax?: boolean, multipleOf?: number) {
    if (multipleOf == undefined) {
        multipleOf = 1.0;
    }
    if (Math.floor(multipleOf) !== multipleOf) {
        throw new Error("MultipleOf for integer values must be an integer.");
    }
    return FloatBase(target, required, min, max, exclusiveMin, exclusiveMax, multipleOf);
}


function FloatBase(target: any, required?: boolean, min?: number, max?: number, exclusiveMin?: boolean, exclusiveMax?: boolean, multipleOf?: number) {
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


function NegativeNumberNotZero(fielder: any, required?: boolean, min?: number, exclusiveMin?: boolean, multipleOf?: number, max?: number, exclusiveMax?: boolean) {
    max = max == undefined ? 0 : Math.min(0, max);
    exclusiveMax = exclusiveMax || max === 0;
    return fielder(required, min, max, exclusiveMin, exclusiveMax, multipleOf);
}

function PositiveNumberNotZero(fielder: any, required?: boolean, max?: number, exclusiveMax?: boolean, multipleOf?: number, min?: number, exclusiveMin?: boolean) {
    min = min == undefined ? 0 : Math.max(0, min);
    exclusiveMin = exclusiveMin || min === 0;
    return fielder(required, min, max, exclusiveMin, exclusiveMax, multipleOf);
}

function NegativeNumber(fielder: any, required?: boolean, min?: number, exclusiveMin?: boolean, multipleOf?: number, max?: number, exclusiveMax?: boolean) {
    max = max == undefined ? 0 : Math.min(0, max);
    return fielder(required, min, max, exclusiveMin, exclusiveMax, multipleOf);
}

function PositiveNumber(fielder: any, required?: boolean, max?: number, exclusiveMax?: boolean, multipleOf?: number, min?: number, exclusiveMin?: boolean) {
    min = min == undefined ? 0 : Math.max(0, min);
    return fielder(required, min, max, exclusiveMin, exclusiveMax, multipleOf);
}
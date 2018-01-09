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

import * as Parse from "./parse";
import * as Maps from "./maps";
import * as Patterns from "./patterns";

/**********************************
 * Strings
 **********************************/

export function string(constraints?: Parse.StringConstraints) {
    return {
        targetType: String,
        constraints: constraints,
        maps: Maps.PredefinedMaps.anyToString,
    };
}

export function stringNotEmpty(constraints?: Parse.StringConstraints) {
    constraints = constraints || {};
    constraints.minLength = 1;
    return string(constraints);
}

export function stringPattern(pattern: Parse.StringConstraintPattern, constraints?: Parse.StringConstraints) {
    constraints = constraints || {};
    constraints.pattern = pattern;
    return string(constraints);
}

export function email(constraints?: Parse.StringConstraints) {
    return stringPattern(Patterns.PredefinedPatterns.email, constraints);
}

export function notWhitespace(constraints?: Parse.StringConstraints) {
    return stringPattern(Patterns.PredefinedPatterns.notWhitespace, constraints);
}

export function url(constraints?: Parse.StringConstraints) {
    return stringPattern(Patterns.PredefinedPatterns.url, constraints);
}

export function uuid(constraints?: Parse.StringConstraints) {
    return stringPattern(Patterns.PredefinedPatterns.uuid, constraints);
}

/**********************************
 * Booleans
 **********************************/

export function boolean(constraints?: Parse.StringConstraints) {
    return {
        targetType: Boolean,
        constraints: constraints,
        maps: [
            Maps.PredefinedMaps.stringToBoolean,
            Maps.PredefinedMaps.numberToBoolean
        ]
    };
}

/**********************************
 * Dates
 **********************************/

export function date(constraints?: Parse.StringConstraints) {
    return {
        targetType: Date,
        constraints: constraints,
        maps: [
            Maps.PredefinedMaps.anyToDate
        ]
    };
}

export function customDate(format: string, nonStrict = false, constraints?: Parse.StringConstraints) {
    return {
        targetType: Date,
        constraints: constraints,
        maps: [
            Maps.PredefinedMaps.stringToCustomDate(format, nonStrict)
        ]
    };
}

/**********************************
 * Numbers
 **********************************/

export function float(constraints?: Parse.NumberConstraints) {
    return {
        targetType: Number,
        constraints: constraints,
        maps: Maps.PredefinedMaps.stringToNumber,
    };
}

export function customSeparatorsFloat(decimalSeparators = ".", thousandSeparators = "", constraints?: Parse.NumberConstraints) {
    return {
        targetType: Number,
        constraints: constraints,
        maps: Maps.PredefinedMaps.stringToNumberWithCustomSeparators(decimalSeparators, thousandSeparators)
    };
}


export function positiveFloat(constraints?: Parse.NumberConstraints) {
    constraints = constraints || {};
    constraints.minimum = (constraints.minimum && constraints.minimum > 0) ? constraints.minimum : 0;
    return float(constraints);
}

export function positiveNotZeroFloat(constraints?: Parse.NumberConstraints) {
    constraints = constraints || {};
    constraints.minimum = (constraints.minimum && constraints.minimum > 0) ? constraints.minimum : 0;
    constraints.exclusiveMinimum = true;
    return float(constraints);
}

export function negativeFloat(constraints?: Parse.NumberConstraints) {
    constraints = constraints || {};
    constraints.maximum = (constraints.maximum && constraints.maximum < 0) ? constraints.maximum : 0;
    return float(constraints);
}

export function negativeNotZeroFloat(constraints?: Parse.NumberConstraints) {
    constraints = constraints || {};
    constraints.maximum = (constraints.maximum && constraints.maximum < 0) ? constraints.maximum : 0;
    constraints.exclusiveMaximum = true;
    return float(constraints);
}

export function latitude(constraints?: Parse.NumberConstraints) {
    constraints = constraints || {};
    constraints.minimum = (constraints.minimum && constraints.minimum > -90) ? constraints.minimum : -90;
    constraints.maximum = (constraints.maximum && constraints.maximum < 90) ? constraints.maximum : 90;
    return float(constraints);
}

export function longitude(constraints?: Parse.NumberConstraints) {
    constraints = constraints || {};
    constraints.minimum = (constraints.minimum && constraints.minimum > -180) ? constraints.minimum : -180;
    constraints.maximum = (constraints.maximum && constraints.maximum < 180) ? constraints.maximum : 180;
    return float(constraints);
}

export function integer(floatCPOGenerator: (constraints: Parse.NumberConstraints) => Parse.ParseOptionsI, constraints?: Parse.NumberConstraints) {
    constraints = constraints || {};
    constraints.multipleOf = constraints.multipleOf || 1;
    if (Math.floor(constraints.multipleOf) !== constraints.multipleOf) {
        throw new Error("multipleOf for integer values must be an integer.");
    }
    return floatCPOGenerator(constraints);
}

/**********************************
 * Arrays
 **********************************/

export function array(underlyingPO: Parse.ParseOptionsI, constraints?: Parse.ArrayConstraints) {
    constraints = constraints || {};
    constraints.underlyingTypeParseOptions = underlyingPO;
    return {
        targetType: Array,
        constraints: constraints
    };
}
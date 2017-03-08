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
/**********************************
 * Strings
 **********************************/
export declare function string(constraints?: Parse.StringConstraints): {
    targetType: StringConstructor;
    constraints: Parse.StringConstraints;
    maps: Maps.Map;
};
export declare function stringNotEmpty(constraints?: Parse.StringConstraints): {
    targetType: StringConstructor;
    constraints: Parse.StringConstraints;
    maps: Maps.Map;
};
export declare function stringPattern(pattern: Parse.StringConstraintPattern, constraints?: Parse.StringConstraints): {
    targetType: StringConstructor;
    constraints: Parse.StringConstraints;
    maps: Maps.Map;
};
export declare function stringEmail(constraints?: Parse.StringConstraints): {
    targetType: StringConstructor;
    constraints: Parse.StringConstraints;
    maps: Maps.Map;
};
export declare function stringNotWhitespace(constraints?: Parse.StringConstraints): {
    targetType: StringConstructor;
    constraints: Parse.StringConstraints;
    maps: Maps.Map;
};
/**********************************
 * Booleans
 **********************************/
export declare function boolean(constraints?: Parse.StringConstraints): {
    targetType: BooleanConstructor;
    constraints: Parse.StringConstraints;
    maps: Maps.Map[];
};
/**********************************
 * Dates
 **********************************/
export declare function date(constraints?: Parse.StringConstraints): {
    targetType: DateConstructor;
    constraints: Parse.StringConstraints;
    maps: Maps.Map[];
};
export declare function customDate(format: string, nonStrict?: boolean, constraints?: Parse.StringConstraints): {
    targetType: DateConstructor;
    constraints: Parse.StringConstraints;
    maps: Maps.Map[];
};
/**********************************
 * Numbers
 **********************************/
export declare function float(constraints?: Parse.NumberConstraints): {
    targetType: NumberConstructor;
    constraints: Parse.NumberConstraints;
    maps: Maps.Map;
};
export declare function positiveFloat(constraints?: Parse.NumberConstraints): {
    targetType: NumberConstructor;
    constraints: Parse.NumberConstraints;
    maps: Maps.Map;
};
export declare function positiveNotZeroFloat(constraints?: Parse.NumberConstraints): {
    targetType: NumberConstructor;
    constraints: Parse.NumberConstraints;
    maps: Maps.Map;
};
export declare function negativeFloat(constraints?: Parse.NumberConstraints): {
    targetType: NumberConstructor;
    constraints: Parse.NumberConstraints;
    maps: Maps.Map;
};
export declare function negativeNotZeroFloat(constraints?: Parse.NumberConstraints): {
    targetType: NumberConstructor;
    constraints: Parse.NumberConstraints;
    maps: Maps.Map;
};
export declare function integer(floatCPOGenerator: (constraints: Parse.NumberConstraints) => Parse.ParseOptionsI, constraints?: Parse.NumberConstraints): Parse.ParseOptionsI;
/**********************************
 * Arrays
 **********************************/
export declare function array(underlyingPO: Parse.ParseOptionsI, constraints?: Parse.ArrayConstraints): {
    targetType: ArrayConstructor;
    constraints: Parse.ArrayConstraints;
};

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
import * as Field from "./field";
import * as Maps from "./maps";
import * as Patterns from "./patterns";
export declare function setEmptyStringIsUndefinedForOptionalCheck(val: boolean): void;
export declare type StringConstraintPattern = Patterns.Pattern | string[];
export declare type Constraints = StringConstraints | NumberConstraints | ArrayConstraints;
export declare class ArrayConstraints {
    /**
     * Minimum acceptable length for array
     */
    minLength?: number;
    /**
     * Maximum acceptable length for array
     */
    maxLength?: number;
    /**
     * Underlying array ParseOptions
     */
    underlyingTypeParseOptions?: ParseOptionsI;
    /**
     * Is optional
     */
    optional?: boolean;
}
export declare class StringConstraints {
    /**
     * Minimum acceptable length for string
     */
    minLength?: number;
    /**
     * Maximum acceptable length for string
     */
    maxLength?: number;
    /**
     * A pattern that the string must match to. It can be a RegEx object, a string with a RegEx or an array of strings.
     * In the case of a string array, the only valid values will be those on the array.
     * Also, it can be one of the predefined pattens in the 'Pattern' enum.
     */
    pattern?: StringConstraintPattern;
    /**
     * Is optional
     */
    optional?: boolean;
}
export declare class NumberConstraints {
    /**
     * Numbers can be restricted to a multiple of a given number, using the multipleOf keyword. It may be set to any positive number.
     * Clever use of the multipleOf keyword can be used to accept only integers, setting it to: 1.0
     */
    multipleOf?: number;
    /**
     * Ranges of numbers are specified using a combination of the minimum, maximum, exclusiveMinimum and exclusiveMaximum keywords.

        * minimum specifies a minimum numeric value.
        * exclusiveMinimum is a boolean. When true, it indicates that the range excludes the minimum value.
                                         When false (or not included), it indicates that the range includes the minimum value.
        * maximum specifies a maximum numeric value.
        * exclusiveMaximum is a boolean. When true, it indicates that the range excludes the maximum value.
                                         When false (or not included), it indicates that the range includes the maximum value.

     */
    minimum?: number;
    exclusiveMinimum?: boolean;
    maximum?: number;
    exclusiveMaximum?: boolean;
    /**
    * Is optional
    */
    optional?: boolean;
}
export interface ParseOptionsI {
    constraints?: Constraints;
    maps?: Maps.Map | Maps.Map[];
    targetType: any;
}
export declare class ParseOptions<T> implements ParseOptionsI {
    targetType: Field.GenericConstructor<T>;
    constraints?: Constraints;
    maps?: Maps.Map | Maps.Map[];
}
export declare function stringConstraintPatternToPattern(pattern: StringConstraintPattern): Patterns.Pattern;
export declare function getTypeString(type: any): "string" | "number" | "date" | "boolean";
export declare function parseValue<T>(options: ParseOptions<T>, value: any): T;

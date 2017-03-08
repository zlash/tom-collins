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

export type StringConstraintPattern = Patterns.Pattern | string[];
export type Constraints = StringConstraints | NumberConstraints | ArrayConstraints;

export class ArrayConstraints {
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

export class StringConstraints {
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

export class NumberConstraints {
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

export class ParseOptions<T> implements ParseOptionsI {
    targetType: Field.GenericConstructor<T>;
    constraints?: Constraints;
    maps?: Maps.Map | Maps.Map[];
}

export function stringConstraintPatternToPattern(pattern: StringConstraintPattern): Patterns.Pattern {
    if (pattern == undefined) {
        return undefined;
    }

    if (pattern instanceof Array) {
        let regex = "^(";
        let name = "";

        for (let str of pattern) {
            regex += str.toString().replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "|";
            name += str.toString() + "|";
        }

        regex = regex.slice(0, -1) + ")$";
        name = name.slice(0, -1);

        return {
            name: name,
            matchers: { regex: new RegExp(regex) }
        };
    }

    return pattern;
}

function checkPODtype(obj: any, podType: any) {
    if (podType === String && ((typeof obj) === "string" || obj instanceof String)) {
        return true;
    } else if (podType === Number && ((typeof obj) === "number" || obj instanceof Number)) {
        return true;
    } else if (podType === Boolean && ((typeof obj) === "boolean" || obj instanceof Boolean)) {
        return true;
    }
    return false;
}

export function parseValue<T>(options: ParseOptions<T>, value: any): T {

    if (value == undefined) {
        if (options.constraints == undefined || (options.constraints != undefined && options.constraints.optional !== true)) {
            throw new Error("Value is undefined and not optional.");
        }
        return value;
    }

    if (options.maps != undefined) {

        if (!(options.maps instanceof Array)) {
            options.maps = [options.maps];
        }

        map_loop: for (let map of options.maps) {
            if (map.type === "*" || checkPODtype(value, map.type) || value instanceof map.type) {
                value = map.map(value);
                break map_loop;
            }
        }
    }

    if (!checkPODtype(value, options.targetType) && !(value instanceof options.targetType)) {
        throw new Error(`Invalid type, expected '${options.targetType.name}'`);
    }

    if (options.constraints != undefined) {
        if (value instanceof Array) {

            let constraintsArray = options.constraints as ArrayConstraints;
            let valueArray: Array<any> = value;

            if (constraintsArray.minLength != undefined && valueArray.length < constraintsArray.minLength) {
                throw new Error(`Array length constraint violation, it must be at least ${constraintsArray.minLength} characters long.`);
            }

            if (constraintsArray.maxLength != undefined && valueArray.length > constraintsArray.maxLength) {
                throw new Error(`Array length constraint violation, it must be ${constraintsArray.maxLength} or less characters long.`);
            }

            if (constraintsArray.underlyingTypeParseOptions != undefined) {
                for (let i = 0; i < valueArray.length; i++) {
                    try {
                        valueArray[i] = parseValue(constraintsArray.underlyingTypeParseOptions, valueArray[i]);
                    } catch (err) {
                        throw new Error(`Element at [${i}]: ${err.message}`);
                    }
                }
            }

        } else if (typeof (value) === "string" || value instanceof String) {

            let constraintsStr = options.constraints as StringConstraints;
            if (constraintsStr.minLength != undefined && (value as string).length < constraintsStr.minLength) {
                throw new Error(`String length constraint violation, it must be at least ${constraintsStr.minLength} characters long.`);
            }

            if (constraintsStr.maxLength != undefined && (value as string).length > constraintsStr.maxLength) {
                throw new Error(`String length constraint violation, it must be ${constraintsStr.maxLength} or less characters long.`);
            }

            if (constraintsStr.pattern != undefined) {
                let pattern = stringConstraintPatternToPattern(constraintsStr.pattern);

                if (!(pattern.matchers instanceof Array)) {
                    pattern.matchers = [pattern.matchers];
                }

                for (let matcher of pattern.matchers) {
                    if (matcher.regex.exec(value as string) == undefined) {
                        if (!matcher.invertMatch) {
                            throw new Error(`String pattern constraint violation, it must match match the pattern: '${pattern.name}'`);
                        }
                    } else {
                        if (matcher.invertMatch === true) {
                            throw new Error(`String pattern constraint violation, it must match match the pattern: '${pattern.name}'`);
                        }
                    }
                }


            }

        } else if (typeof (value) === "number" || value instanceof Number) {

            let constraintsN = options.constraints as NumberConstraints;
            if (constraintsN.multipleOf != undefined) {
                if (constraintsN.multipleOf <= 0) {
                    throw new Error("multipleOf must be greater than 0.");
                }
                if ((value as number) % constraintsN.multipleOf !== 0) {
                    throw new Error(`Numeric constaint violation, value must be a multiple of ${constraintsN.multipleOf}`);
                }
            }

            if (constraintsN.minimum != undefined) {
                if (value < constraintsN.minimum || (constraintsN.exclusiveMinimum === true && value === constraintsN.minimum)) {
                    throw new Error(`Numeric constaint violation, value must be${constraintsN.exclusiveMinimum === true ? " " : " equal or "}greater than ${constraintsN.minimum}`);
                }
            }

            if (constraintsN.maximum != undefined) {
                if (value > constraintsN.maximum || (constraintsN.exclusiveMaximum === true && value === constraintsN.maximum)) {
                    throw new Error(`Numeric constaint violation, value must be${constraintsN.exclusiveMaximum === true ? " " : " equal or "}less than ${constraintsN.maximum}`);
                }
            }
        }
    }

    return value as T;
}
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

export enum PredefinedPattern {
    Email, // Internet email address, see RFC 5322, section 3.4.1.
    Uri // A universal resource identifier (URI), according to RFC3986.
}

export type StringConstraintPattern = RegExp | string | string[] | PredefinedPattern;
export type Constraints = StringConstraints | NumberConstraints;

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
}

export function stringConstraintPatternToRegExp(pattern: StringConstraintPattern) {
    if (pattern == undefined) {
        return undefined;
    }

    if (typeof (pattern) === "string") {
        return new RegExp(pattern);
    }

    if (typeof (pattern) === "number") {
        return {
            [PredefinedPattern.Email]: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            [PredefinedPattern.Uri]: new RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?")
        }[pattern];
    }

    if (pattern instanceof Array) {
        let regex = "^(";

        for (let str of pattern) {
            regex += str.toString().replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "|";
        }

        return new RegExp(regex.slice(0, -1) + ")$");
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

export function parseString(value: any, constraints?: StringConstraints & { optional?: boolean; }): string {
    value = value.toString();
    return parseValue(String, value, constraints) as string;
}

export function parseInt(value: any, constraints?: NumberConstraints & { optional?: boolean; }): number {
    return parseValue(Number, value, constraints, [Maps.PredefinedMaps.stringToInt]) as number;
}

export function parseFloat(value: any, constraints?: NumberConstraints & { optional?: boolean; }): number {
    return parseValue(Number, value, constraints, [Maps.PredefinedMaps.stringToNumber]) as number;
}

export function parseValue<T>(targetType: TC.GenericConstructor<T>, value: any, constraints?: Constraints & { optional?: boolean; }, maps?: Maps.Map[]): T {

    if (value == undefined) {
        if (constraints != undefined && constraints.optional !== true) {
            throw new Error("Required value.");
        }
        return value;
    }

    if (maps != undefined) {
        map_loop: for (let map of maps) {
            if (checkPODtype(value, map.type) || value instanceof map.type) {
                value = map.map(value);
                break map_loop;
            }
        }
    }

    if (!checkPODtype(value, targetType) && !(value instanceof targetType)) {
        throw new Error(`Invalid type, expected '${targetType.name}'`);
    }

    if (constraints != undefined) {
        if (typeof (value) === "string" || value instanceof String) {

            let constraintsStr = constraints as StringConstraints;
            if (constraintsStr.minLength != undefined && (value as string).length < constraintsStr.minLength) {
                throw new Error(`String length constraint violation, it must be at least ${constraintsStr.minLength} characters long.`);
            }

            if (constraintsStr.maxLength != undefined && (value as string).length > constraintsStr.maxLength) {
                throw new Error(`String length constraint violation, it must be ${constraintsStr.maxLength} or less characters long.`);
            }

            if (constraintsStr.pattern != undefined) {
                let regExp = stringConstraintPatternToRegExp(constraintsStr.pattern);
                if (regExp.exec(value as string) == undefined) {
                    throw new Error(`String pattern constraint violation, it must match match the RegEx: '${regExp.toString()}'`);
                }
            }

        } else if (typeof (value) === "number" || value instanceof Number) {

            let constraintsN = constraints as NumberConstraints;
            if (constraintsN.multipleOf != undefined && (value as number) % constraintsN.multipleOf !== 0) {
                throw new Error(`Numeric constaint violation, value must be a multiple of ${constraintsN.multipleOf}`);
            }

            if (constraintsN.minimum != undefined) {
                let violation = value < constraintsN.minimum;
                violation = constraintsN.exclusiveMinimum ? (violation && value === constraintsN.minimum) : violation;
                if (violation) {
                    throw new Error(`Numeric constaint violation, value must be${constraintsN.exclusiveMinimum === true ? " " : " equal or "}greater than ${constraintsN.minimum}`);
                }
            }

            if (constraintsN.maximum != undefined) {
                let violation = value > constraintsN.maximum;
                violation = constraintsN.exclusiveMaximum ? (violation && value === constraintsN.maximum) : violation;
                if (violation) {
                    throw new Error(`Numeric constaint violation, value must be${constraintsN.exclusiveMaximum === true ? " " : " equal or "}less than ${constraintsN.minimum}`);
                }
            }
        }
    }

    return value as T;
}
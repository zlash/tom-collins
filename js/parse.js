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
Object.defineProperty(exports, "__esModule", { value: true });
const Field = require("./field");
let emptyStringIsUndefinedForOptionalCheck = false;
function setEmptyStringIsUndefinedForOptionalCheck(val) {
    emptyStringIsUndefinedForOptionalCheck = val;
}
exports.setEmptyStringIsUndefinedForOptionalCheck = setEmptyStringIsUndefinedForOptionalCheck;
class ArrayConstraints {
}
exports.ArrayConstraints = ArrayConstraints;
class StringConstraints {
}
exports.StringConstraints = StringConstraints;
class NumberConstraints {
}
exports.NumberConstraints = NumberConstraints;
class ParseOptions {
}
exports.ParseOptions = ParseOptions;
function stringConstraintPatternToPattern(pattern) {
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
exports.stringConstraintPatternToPattern = stringConstraintPatternToPattern;
function checkPODtype(obj, podType) {
    if (podType === String && ((typeof obj) === "string" || obj instanceof String)) {
        return true;
    }
    else if (podType === Number && ((typeof obj) === "number" || obj instanceof Number)) {
        return true;
    }
    else if (podType === Boolean && ((typeof obj) === "boolean" || obj instanceof Boolean)) {
        return true;
    }
    return false;
}
function getTypeString(type) {
    if (type === String) {
        return "string";
    }
    else if (type === Number) {
        return "number";
    }
    else if (type === Boolean) {
        return "boolean";
    }
    else if (type === Date) {
        return "date";
    }
    return undefined;
}
exports.getTypeString = getTypeString;
function parseValue(options, value) {
    if (value == undefined) {
        if (options.constraints == undefined || (options.constraints != undefined && options.constraints.optional !== true)) {
            throw new Error("Value is undefined and not optional.");
        }
        return value;
    }
    if (emptyStringIsUndefinedForOptionalCheck === true && options.constraints != undefined && options.constraints.optional === true
        && typeof (value) === "string" && value === "") {
        return undefined;
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
            let constraintsArray = options.constraints;
            let valueArray = value;
            if (constraintsArray.minLength != undefined && valueArray.length < constraintsArray.minLength) {
                throw new Error(`Array length constraint violation, it must be at least ${constraintsArray.minLength} characters long.`);
            }
            if (constraintsArray.maxLength != undefined && valueArray.length > constraintsArray.maxLength) {
                throw new Error(`Array length constraint violation, it must be ${constraintsArray.maxLength} or less characters long.`);
            }
            if (constraintsArray.underlyingTypeParseOptions != undefined) {
                let uType = constraintsArray.underlyingTypeParseOptions.targetType;
                let hasMetadata = Field.checkIfTypeHasFieldsMetadata(uType);
                for (let i = 0; i < valueArray.length; i++) {
                    try {
                        if (!hasMetadata) {
                            valueArray[i] = parseValue(constraintsArray.underlyingTypeParseOptions, valueArray[i]);
                        }
                        else {
                            valueArray[i] = Field.parse(uType, valueArray[i]);
                        }
                    }
                    catch (err) {
                        throw new Error(`Element at [${i}]: ${err.message}`);
                    }
                }
            }
        }
        else if (typeof (value) === "string" || value instanceof String) {
            let constraintsStr = options.constraints;
            if (constraintsStr.minLength != undefined && value.length < constraintsStr.minLength) {
                throw new Error(`String length constraint violation, it must be at least ${constraintsStr.minLength} characters long.`);
            }
            if (constraintsStr.maxLength != undefined && value.length > constraintsStr.maxLength) {
                throw new Error(`String length constraint violation, it must be ${constraintsStr.maxLength} or less characters long.`);
            }
            if (constraintsStr.pattern != undefined) {
                let pattern = stringConstraintPatternToPattern(constraintsStr.pattern);
                if (!(pattern.matchers instanceof Array)) {
                    pattern.matchers = [pattern.matchers];
                }
                for (let matcher of pattern.matchers) {
                    if (matcher.regex.exec(value) == undefined) {
                        if (!matcher.invertMatch) {
                            throw new Error(`String pattern constraint violation, it must match match the pattern: '${pattern.name}'`);
                        }
                    }
                    else {
                        if (matcher.invertMatch === true) {
                            throw new Error(`String pattern constraint violation, it must match match the pattern: '${pattern.name}'`);
                        }
                    }
                }
            }
        }
        else if (typeof (value) === "number" || value instanceof Number) {
            let constraintsN = options.constraints;
            if (constraintsN.multipleOf != undefined) {
                if (constraintsN.multipleOf <= 0) {
                    throw new Error("multipleOf must be greater than 0.");
                }
                if (value % constraintsN.multipleOf !== 0) {
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
    return value;
}
exports.parseValue = parseValue;
//# sourceMappingURL=parse.js.map
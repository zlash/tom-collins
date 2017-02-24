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
import * as Patterns from "./patterns";

export function StringNotEmpty(required?: boolean, maxLength?: number, pattern?: Fields.StringConstraintPattern) {
    return StringField(required, 1, maxLength, pattern);
}

export function StringNotWhitespace(required?: boolean, maxLength?: number) {
    return StringField(required, 1, maxLength, Patterns.PredefinedPatterns.notWhitespace);
}

export function Email(required?: boolean) {
    return StringField(required, 1, undefined, Patterns.PredefinedPatterns.email);
}

export function StringPattern(pattern: Fields.StringConstraintPattern, required?: boolean, minLength?: number, maxLength?: number) {
    return StringField(required, minLength, maxLength, pattern);
}

export function StringField(required?: boolean, minLength?: number, maxLength?: number, pattern?: Fields.StringConstraintPattern) {
    return TC.Field({
        required: required,
        typeConstraints: {
            minLength: minLength,
            maxLength: maxLength,
            pattern: pattern
        }
    });
}


export function parseBoolean(value: any, required?: boolean) {
    return BooleanBase(individualParser(Boolean), required)(value);
}

export function BooleanField(required?: boolean) {
    return BooleanBase(TC.Field, required);
}

export function BooleanBase(t: any, required?: boolean) {
    return t({
        required: required,
        maps: [
            Maps.PredefinedMaps.stringToBoolean,
            Maps.PredefinedMaps.numberToBoolean
        ]
    });
}

function individualParser<T>(targetType: TC.GenericConstructor<T>) {
    return (options: TC.FieldOptions) => {
        return (value: any) => {
            return Fields.parseValue(targetType, value, { ...options.typeConstraints, optional: (options.required === false) }, options.maps);
        };
    };
}

export function DateField(required?: boolean) {
    return TC.Field({
        required: required,
        maps: [
            Maps.PredefinedMaps.stringToDate
        ]
    });
}

export function CustomDate(format: string, required = true, nonStrict = false) {
    return TC.Field({
        required: required,
        maps: [
            Maps.PredefinedMaps.stringToCustomDate(format, nonStrict)
        ]
    });
}
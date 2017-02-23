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
const Moment = require("moment");
class Map {
}
exports.Map = Map;
/**
 * Predefined maps.
 */
class PredefinedMaps {
    static stringToCustomDate(format, nonStrict) {
        return {
            type: String,
            map: (v) => {
                let m = Moment(v, format, !(nonStrict === true));
                if (!m.isValid()) {
                    throw new Error("Failed to map string to date, invalid string.");
                }
                return m.toDate();
            }
        };
    }
}
PredefinedMaps.stringToDate = {
    type: String,
    map: (v) => {
        let m = Moment(v, Moment.ISO_8601);
        if (!m.isValid()) {
            throw new Error("Failed to map string to date, invalid string.");
        }
        return m.toDate();
    }
};
PredefinedMaps.stringToNumber = {
    type: String,
    map: (v) => {
        let ret = parseFloat(v);
        if (isNaN(ret)) {
            throw new Error("Failed to map string to number.");
        }
        return ret;
    }
};
PredefinedMaps.stringToBoolean = {
    type: String,
    map: (v) => {
        if (v.toUpperCase() === "TRUE" || v === "1") {
            return true;
        }
        if (v.toUpperCase() === "FALSE" || v === "0") {
            return false;
        }
        throw new Error("Invalid string to boolean cast (Expected values: 'true' or 'false')");
    }
};
PredefinedMaps.numberToBoolean = {
    type: Number,
    map: (v) => {
        if (v === 1) {
            return true;
        }
        if (v === 0) {
            return false;
        }
        throw new Error("Invalid number to boolean cast (Expected values: 0 or 1)");
    }
};
exports.PredefinedMaps = PredefinedMaps;
//# sourceMappingURL=maps.js.map
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

import * as Moment from "moment";

export class Map {
    type: any;
    map: (v: any) => any;
}

/**
 * Predefined maps.
 */
export class PredefinedMaps {
    static stringToDate: Map = {
        type: String,
        map: (v: string) => {
            let m = Moment(v, Moment.ISO_8601);
            if (!m.isValid()) {
                throw new Error("Failed to map string to date, invalid string.");
            }
            return m.toDate();
        }
    };

    static stringToCustomDate(format: string, nonStrict?: boolean): Map {
        return {
            type: String,
            map: (v: string) => {
                let m = Moment(v, format, !(nonStrict === true));
                if (!m.isValid()) {
                    throw new Error("Failed to map string to date, invalid string.");
                }
                return m.toDate();
            }
        };
    }

    static anyToString: Map = {
        type: "*",
        map: (v: string) => {
            return v.toString();
        }
    };


    static stringToNumber: Map = {
        type: String,
        map: (v: string) => {
            let ret = parseFloat(v);
            if (isNaN(ret)) {
                throw new Error("Failed to map string to number.");
            }
            return ret;
        }
    };

    static stringToBoolean: Map = {
        type: String,
        map: (v: string) => {
            if (v.toUpperCase() === "TRUE" || v === "1") {
                return true;
            }
            if (v.toUpperCase() === "FALSE" || v === "0") {
                return false;
            }
            throw new Error("Invalid string to boolean cast (Expected values: 'true' or 'false')");
        }
    };

    static numberToBoolean: Map = {
        type: Number,
        map: (v: number) => {
            if (v === 1) {
                return true;
            }
            if (v === 0) {
                return false;
            }
            throw new Error("Invalid number to boolean cast (Expected values: 0 or 1)");
        }
    };
}
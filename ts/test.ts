import * as TC from "./index";
import * as Assert from "assert";

// Mocha describe method
declare let describe: any;
declare let it: any;



class ForNumericTests {
    @TC.Float(false)
    optionalFloat: number;

    @TC.PositiveFloat(true, 10)
    positiveFloatMax10: number;

    @TC.NegativeFloat(true, -10, true)
    negativeFloatMinExclusiveMinus10: number;

    @TC.PositiveFloatNotZero()
    positiveFloatNotZero: number;

    @TC.NegativeFloatNotZero()
    negativeFloatNotZero: number;

    @TC.Integer()
    integer: number;

    @TC.PositiveInteger(true, 5, true)
    positiveIntegerMaxExclusive5: number;

    @TC.NegativeInteger(true, -5)
    negativeIntegerMinMinus5: number;

    @TC.PositiveIntegerNotZero()
    positiveIntegerNotZero: number;

    @TC.NegativeIntegerNotZero()
    negativeIntegerNotZero: number;
}

function getValidObjectForNumericTests() {
    return {
        optionalFloat: 1.1,
        positiveFloatMax10: 1.2,
        negativeFloatMinExclusiveMinus10: -1.3,
        positiveFloatNotZero: 1.4,
        negativeFloatNotZero: 1.5,
        integer: 2,
        positiveIntegerMaxExclusive5: 3,
        negativeIntegerMinMinus5: -4,
        positiveIntegerNotZero: 5,
        negativeIntegerNotZero: 6
    }
}


describe("Field Tests", function () {
    describe("Float fields", function () {
        it("should parse an object missing an optional property", function () {
            let obj = getValidObjectForNumericTests();
            delete obj.optionalFloat;
            TC.parse(ForNumericTests, obj);
        });
    });
});


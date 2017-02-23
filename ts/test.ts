import * as TC from "./index";
import * as Assert from "assert";
import * as Moment from "moment";

// Mocha methods
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

    @TC.Integer(true, undefined, undefined, undefined, undefined, 3)
    integerMultipleOf3: number;
}

function getValidObjectForNumericTests(): any {
    return {
        optionalFloat: 1.1,
        positiveFloatMax10: 1.2,
        negativeFloatMinExclusiveMinus10: -1.3,
        positiveFloatNotZero: 1.4,
        negativeFloatNotZero: -1.5,
        integer: 2,
        positiveIntegerMaxExclusive5: 3,
        negativeIntegerMinMinus5: -4,
        positiveIntegerNotZero: 5,
        negativeIntegerNotZero: -6,
        integerMultipleOf3: 6
    };
}

class ForStringTests {

    @TC.String(true, 5, 10)
    stringMin5Max10: string;

    @TC.String(true, undefined, undefined, ["banana", "apple"])
    bananaOrApple: string;

    @TC.Email()
    email: string;

    @TC.StringNotEmpty()
    stringNotEmpty: string;

    @TC.StringNotWhitespace()
    stringNotWhitespace: string;
}


function getValidObjectForStringTests(): any {
    return {
        optionalString: "",
        bananaOrApple: "banana",
        stringMin5Max10: "1234567",
        email: "a@b.com",
        stringNotEmpty: "string",
        stringNotWhitespace: "string",
    };
}

class ForBooleanTests {
    @TC.Boolean()
    bool: boolean;
}

function getValidObjectForBooleanTests(): any {
    return {
        bool: true,
    };
}


class ForDateTests {
    @TC.Date()
    date: Date;

    @TC.CustomDate("MM YYYY DD")
    customDate: Date;
}

function getValidObjectForDateTests(): any {
    return {
        date: new Date(),
        customDate: new Date(),
    };
}

class NestedType {
    @TC.Float()
    x: number;
}

class TypeWithNestedField {
    @TC.Field()
    nt: NestedType;

    @TC.Field({ required: false })
    optionalNT: NestedType;

    @TC.Field()
    name: string;
}

describe("Fields:", function () {

    describe("General:", function () {
        it("should parse an object missing an optional property", function () {
            let obj = getValidObjectForNumericTests();
            delete obj.optionalFloat;
            TC.parse(ForNumericTests, obj);
        });

        it("should fail to parse an object missing a required property", function () {
            Assert.throws(() => {
                let obj = getValidObjectForNumericTests();
                delete obj.positiveFloatMax10;
                TC.parse(ForNumericTests, obj);
            }, /required/i);
        });

        it("should parse correctly nested types with field definitions", function () {
            let obj = TC.parse(TypeWithNestedField, { nt: { x: "0.5" }, name: "test" });
            Assert.equal(obj.nt.x, 0.5);
            Assert.throws(() => {
                TC.parse(TypeWithNestedField, { nt: { x: "not a number" }, name: "test" });
            }, /Failed to map string to number/i);
            Assert.throws(() => {
                TC.parse(TypeWithNestedField, { name: "test" });
            }, /Required field nt missing/i);
        });

    });

    describe("Float fields:", function () {

        it("should reject an empty object", function () {
            Assert.throws(() => {
                TC.parse(ForNumericTests, {});
            }, /required/i);
        });

        it("should parse a float from a string", function () {
            let obj = getValidObjectForNumericTests();
            obj.optionalFloat = "0.5";
            obj = TC.parse(ForNumericTests, obj);
            Assert.equal(obj.optionalFloat, 0.5);
        });

        it("should fail to parse non floats", function () {
            Assert.throws(() => {
                let obj = getValidObjectForNumericTests();
                obj.optionalFloat = "a123";
                TC.parse(ForNumericTests, obj);
            }, /failed to map/i);
        });

        it("should enforce a positive value", function () {
            Assert.throws(() => {
                let obj = getValidObjectForNumericTests();
                obj.positiveFloatMax10 = "-0.1";
                TC.parse(ForNumericTests, obj);
            }, /value must be equal or greater than/i);
        });

        it("should enforce a maximum value", function () {
            Assert.throws(() => {
                let obj = getValidObjectForNumericTests();
                obj.positiveFloatMax10 = "10.1";
                TC.parse(ForNumericTests, obj);
            }, /value must be equal or less than/i);
        });

        it("should not allow zero in notZero float", function () {
            Assert.throws(() => {
                let obj = getValidObjectForNumericTests();
                obj.positiveFloatNotZero = "0";
                TC.parse(ForNumericTests, obj);
            }, /value must be greater than/i);
        });

        it("should enforce a negative value", function () {
            Assert.throws(() => {
                let obj = getValidObjectForNumericTests();
                obj.negativeFloatMinExclusiveMinus10 = "0.1";
                TC.parse(ForNumericTests, obj);
            }, /value must be equal or less than/i);
        });

        it("should enforce an exclusive minimum", function () {
            Assert.throws(() => {
                let obj = getValidObjectForNumericTests();
                obj.negativeFloatMinExclusiveMinus10 = "-10";
                TC.parse(ForNumericTests, obj);
            }, /value must be greater than/i);
        });

    });

    describe("Integer fields:", function () {

        it("should parse an integer from a string", function () {
            let obj = getValidObjectForNumericTests();
            obj.integer = "1";
            obj = TC.parse(ForNumericTests, obj);
            Assert.equal(obj.integer, 1);
        });

        it("should reject floats for an integer field", function () {
            Assert.throws(() => {
                let obj = getValidObjectForNumericTests();
                obj.integer = "0.1";
                TC.parse(ForNumericTests, obj);
            }, /value must be a multiple of 1/i);
        });

        it("should handle multipleOf correctly", function () {

            let obj = getValidObjectForNumericTests();
            obj.integerMultipleOf3 = "9";
            obj = TC.parse(ForNumericTests, obj);
            Assert.equal(obj.integerMultipleOf3, 9);

            Assert.throws(() => {
                let objB = getValidObjectForNumericTests();
                objB.integerMultipleOf3 = "5";
                TC.parse(ForNumericTests, objB);
            }, /value must be a multiple of/i);
        });

    });

    describe("String fields:", function () {

        it("should reject an empty object", function () {
            Assert.throws(() => {
                TC.parse(ForStringTests, {});
            }, /required/i);
        });

        it("should handle valid object correctly", function () {
            let obj = getValidObjectForStringTests();
            TC.parse(ForStringTests, obj);
        });

        it("should handle minLength and maxLength correctly", function () {
            let obj = getValidObjectForStringTests();
            obj.stringMin5Max10 = "1234567";
            obj = TC.parse(ForStringTests, obj);
            Assert.equal(obj.stringMin5Max10, "1234567");

            Assert.throws(() => {
                let objB = getValidObjectForStringTests();
                objB.stringMin5Max10 = "1234";
                TC.parse(ForStringTests, objB);
            }, /String length constraint violation/i);

            Assert.throws(() => {
                let objB = getValidObjectForStringTests();
                objB.stringMin5Max10 = "1234567891011";
                TC.parse(ForStringTests, objB);
            }, /String length constraint violation/i);

        });

        it("should handle optional strings correctly", function () {
            let obj = getValidObjectForStringTests();
            obj.bananaOrApple = "banana";
            obj = TC.parse(ForStringTests, obj);
            Assert.equal(obj.bananaOrApple, "banana");

            obj = getValidObjectForStringTests();
            obj.bananaOrApple = "apple";
            obj = TC.parse(ForStringTests, obj);
            Assert.equal(obj.bananaOrApple, "apple");

            Assert.throws(() => {
                let objB = getValidObjectForStringTests();
                objB.bananaOrApple = "pear";
                TC.parse(ForStringTests, objB);
            }, /must match match the pattern/i);
        });

        it("should handle email correctly", function () {
            let obj = getValidObjectForStringTests();
            obj.email = "my.address@e-mail.co.jp";
            obj = TC.parse(ForStringTests, obj);
            Assert.equal(obj.email, "my.address@e-mail.co.jp");

            Assert.throws(() => {
                let objB = getValidObjectForStringTests();
                objB.email = "1234";
                TC.parse(ForStringTests, objB);
            }, /must match match the pattern/i);

        });

        it("should handle string not empty correctly", function () {
            let obj = getValidObjectForStringTests();
            obj.stringNotEmpty = "!";
            obj = TC.parse(ForStringTests, obj);
            Assert.equal(obj.stringNotEmpty, "!");

            Assert.throws(() => {
                let objB = getValidObjectForStringTests();
                objB.stringNotEmpty = "";
                TC.parse(ForStringTests, objB);
            }, /String length constraint violation/i);
        });

        it("should handle string not whitespace correctly", function () {
            let obj = getValidObjectForStringTests();
            obj.stringNotWhitespace = "     !";
            obj = TC.parse(ForStringTests, obj);
            Assert.equal(obj.stringNotWhitespace, "     !");

            Assert.throws(() => {
                let objB = getValidObjectForStringTests();
                objB.stringNotWhitespace = `
                    `;
                TC.parse(ForStringTests, objB);
            }, /must match match the pattern/i);
        });

    });

    describe("Boolean fields:", function () {

        it("should reject an empty object", function () {
            Assert.throws(() => {
                TC.parse(ForBooleanTests, {});
            }, /required/i);
        });

        it("should handle valid objects correctly", function () {
            let obj = getValidObjectForBooleanTests();
            TC.parse(ForBooleanTests, obj);
            Assert.throws(() => {
                let objB = getValidObjectForStringTests();
                objB.bool = "banana";
                TC.parse(ForBooleanTests, objB);
            }, /Invalid string to boolean cast/i);
            Assert.throws(() => {
                let objB = getValidObjectForStringTests();
                objB.bool = new Date();
                TC.parse(ForBooleanTests, objB);
            }, /Invalid type, expected 'Boolean'/i);
        });

        it("should handle strings correctly", function () {
            let obj = getValidObjectForStringTests();
            obj.bool = "TrUe";
            obj = TC.parse(ForBooleanTests, obj);
            Assert.equal(obj.bool, true);

            obj = getValidObjectForStringTests();
            obj.bool = "fAlSe";
            obj = TC.parse(ForBooleanTests, obj);
            Assert.equal(obj.bool, false);

            obj = getValidObjectForStringTests();
            obj.bool = "1";
            obj = TC.parse(ForBooleanTests, obj);
            Assert.equal(obj.bool, true);

            obj = getValidObjectForStringTests();
            obj.bool = "0";
            obj = TC.parse(ForBooleanTests, obj);
            Assert.equal(obj.bool, false);
        });

        it("should handle numbers correctly", function () {
            let obj = getValidObjectForStringTests();
            obj.bool = 1;
            obj = TC.parse(ForBooleanTests, obj);
            Assert.equal(obj.bool, true);

            obj = getValidObjectForStringTests();
            obj.bool = 0;
            obj = TC.parse(ForBooleanTests, obj);
            Assert.equal(obj.bool, false);
        });
    });

    describe("Date fields:", function () {

        it("should reject an empty object", function () {
            Assert.throws(() => {
                TC.parse(ForDateTests, {});
            }, /required/i);
        });

        it("should handle valid objects correctly", function () {
            let obj = getValidObjectForDateTests();
            TC.parse(ForDateTests, obj);
            Assert.throws(() => {
                let objB = getValidObjectForDateTests();
                objB.date = "banana";
                TC.parse(ForDateTests, objB);
            }, /Failed to map string to date/i);
            Assert.throws(() => {
                let objB = getValidObjectForStringTests();
                objB.date = 1;
                TC.parse(ForDateTests, objB);
            }, /Invalid type, expected 'Date'/i);
        });

        it("should handle ISO-8601 strings correctly", function () {
            let obj = getValidObjectForDateTests();
            obj.date = "2017-02-23T19:01:50Z";
            obj = TC.parse(ForDateTests, obj);
            let dateA = obj.date;

            obj = getValidObjectForDateTests();
            obj.date = "20170223T190150Z";
            obj = TC.parse(ForDateTests, obj);
            let dateB = obj.date;

            obj = getValidObjectForDateTests();
            obj.date = "2017-02-23T16:01:50-03:00";
            obj = TC.parse(ForDateTests, obj);
            let dateC = obj.date;

            Assert(Moment(dateA).isSame(dateB));
            Assert(Moment(dateA).isSame(dateC));
            Assert(Moment(dateB).isSame(dateC));
        });

        it("should handle custom strings correctly", function () {
            let obj = getValidObjectForDateTests();
            obj.customDate = "02 2017 23";
            obj = TC.parse(ForDateTests, obj);
            Assert(Moment("2017-02-23").isSame(obj.customDate));

            Assert.throws(() => {
                let objB = getValidObjectForDateTests();
                objB.customDate = "23 2017 02";
                objB = TC.parse(ForDateTests, objB);
            }, /Failed to map string to date/i);

        });


    });


});


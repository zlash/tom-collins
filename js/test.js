"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const TC = require("./index");
const Assert = require("assert");
const Moment = require("moment");
class ForNumericTests {
}
__decorate([
    TC.Float({ optional: true }),
    __metadata("design:type", Number)
], ForNumericTests.prototype, "optionalFloat", void 0);
__decorate([
    TC.PositiveFloat({ maximum: 10 }),
    __metadata("design:type", Number)
], ForNumericTests.prototype, "positiveFloatMax10", void 0);
__decorate([
    TC.NegativeFloat({ minimum: -10, exclusiveMinimum: true }),
    __metadata("design:type", Number)
], ForNumericTests.prototype, "negativeFloatMinExclusiveMinus10", void 0);
__decorate([
    TC.PositiveNotZeroFloat(),
    __metadata("design:type", Number)
], ForNumericTests.prototype, "positiveFloatNotZero", void 0);
__decorate([
    TC.NegativeNotZeroFloat(),
    __metadata("design:type", Number)
], ForNumericTests.prototype, "negativeFloatNotZero", void 0);
__decorate([
    TC.Integer(),
    __metadata("design:type", Number)
], ForNumericTests.prototype, "integer", void 0);
__decorate([
    TC.PositiveInteger({ maximum: 5, exclusiveMaximum: true }),
    __metadata("design:type", Number)
], ForNumericTests.prototype, "positiveIntegerMaxExclusive5", void 0);
__decorate([
    TC.NegativeInteger({ minimum: -5 }),
    __metadata("design:type", Number)
], ForNumericTests.prototype, "negativeIntegerMinMinus5", void 0);
__decorate([
    TC.PositiveNotZeroInteger(),
    __metadata("design:type", Number)
], ForNumericTests.prototype, "positiveIntegerNotZero", void 0);
__decorate([
    TC.NegativeNotZeroInteger(),
    __metadata("design:type", Number)
], ForNumericTests.prototype, "negativeIntegerNotZero", void 0);
__decorate([
    TC.Integer({ multipleOf: 3 }),
    __metadata("design:type", Number)
], ForNumericTests.prototype, "integerMultipleOf3", void 0);
function getValidObjectForNumericTests() {
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
}
__decorate([
    TC.StringField({ minLength: 5, maxLength: 10 }),
    __metadata("design:type", String)
], ForStringTests.prototype, "stringMin5Max10", void 0);
__decorate([
    TC.StringPattern(["banana", "apple"]),
    __metadata("design:type", String)
], ForStringTests.prototype, "bananaOrApple", void 0);
__decorate([
    TC.Email(),
    __metadata("design:type", String)
], ForStringTests.prototype, "email", void 0);
__decorate([
    TC.StringNotEmpty(),
    __metadata("design:type", String)
], ForStringTests.prototype, "stringNotEmpty", void 0);
__decorate([
    TC.NotWhitespace(),
    __metadata("design:type", String)
], ForStringTests.prototype, "stringNotWhitespace", void 0);
function getValidObjectForStringTests() {
    return {
        optionalString: "",
        bananaOrApple: "banana",
        stringMin5Max10: 1234567,
        email: "a@b.com",
        stringNotEmpty: "string",
        stringNotWhitespace: "string",
    };
}
class ForBooleanTests {
}
__decorate([
    TC.BooleanField(),
    __metadata("design:type", Boolean)
], ForBooleanTests.prototype, "bool", void 0);
function getValidObjectForBooleanTests() {
    return {
        bool: true,
    };
}
class ForDateTests {
}
__decorate([
    TC.DateField(),
    __metadata("design:type", Date)
], ForDateTests.prototype, "date", void 0);
__decorate([
    TC.CustomDate("MM YYYY DD"),
    __metadata("design:type", Date)
], ForDateTests.prototype, "customDate", void 0);
function getValidObjectForDateTests() {
    return {
        date: new Date(),
        customDate: new Date(),
    };
}
class NestedType {
}
__decorate([
    TC.Float(),
    __metadata("design:type", Number)
], NestedType.prototype, "x", void 0);
class TypeWithNestedField {
}
__decorate([
    TC.Field(),
    __metadata("design:type", NestedType)
], TypeWithNestedField.prototype, "nt", void 0);
__decorate([
    TC.Field({ optional: true }),
    __metadata("design:type", NestedType)
], TypeWithNestedField.prototype, "optionalNT", void 0);
__decorate([
    TC.Field(),
    __metadata("design:type", String)
], TypeWithNestedField.prototype, "name", void 0);
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
            }, /Value is undefined and not optional/i);
        });
        it("should parse correctly nested types with field definitions", function () {
            let obj = TC.parse(TypeWithNestedField, { nt: { x: "0.5" }, name: "test" });
            Assert.equal(obj.nt.x, 0.5);
            Assert.throws(() => {
                TC.parse(TypeWithNestedField, { nt: { x: "not a number" }, name: "test" });
            }, /Failed to map string to number/i);
            Assert.throws(() => {
                TC.parse(TypeWithNestedField, { name: "test" });
            }, /Value is undefined and not optional/i);
        });
    });
    describe("Float fields:", function () {
        it("should reject an empty object", function () {
            Assert.throws(() => {
                TC.parse(ForNumericTests, {});
            }, /Value is undefined and not optional/i);
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
            }, /Value is undefined and not optional/i);
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
            }, /Value is undefined and not optional/i);
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
            }, /Value is undefined and not optional/i);
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
describe("Direct Parse Functions:", function () {
    describe("Floats:", function () {
        it("should parse float", function () {
            Assert.throws(() => {
                TC.parseFloat("not a number");
            }, /Failed to map string to number/i);
            Assert.throws(() => {
                TC.parseFloat(undefined);
            }, /Value is undefined and not optional/i);
            Assert.equal(undefined, TC.parseFloat(undefined, { optional: true }));
            Assert.equal(0.5, TC.parseFloat("0.5"));
        });
        it("should parse positive float", function () {
            Assert.throws(() => {
                TC.parsePositiveFloat("-0.5");
            }, /value must be equal or greater than 0/i);
            Assert.equal(0.5, TC.parsePositiveFloat("0.5"));
        });
        it("should parse negative float", function () {
            Assert.throws(() => {
                TC.parseNegativeFloat("0.5");
            }, /value must be equal or less than 0/i);
            Assert.equal(-0.5, TC.parseNegativeFloat("-0.5"));
        });
        it("should parse positive/negative float not zero", function () {
            Assert.throws(() => {
                TC.parsePositiveNotZeroFloat("0");
            }, /value must be greater than 0/i);
            Assert.throws(() => {
                TC.parseNegativeNotZeroFloat("0");
            }, /value must be less than 0/i);
        });
        it("should parse latitude/longitude", function () {
            Assert.throws(() => {
                TC.parseLatitude("100");
            }, /value must be equal or less than 90/i);
            Assert.throws(() => {
                TC.parseLongitude("-200");
            }, /value must be equal or greater than -180/i);
            Assert.equal(0.5, TC.parseLatitude("0.5"));
            Assert.equal(0.5, TC.parseLongitude("0.5"));
        });
    });
    describe("Integers:", function () {
        it("should parse integers", function () {
            Assert.throws(() => {
                TC.parseInteger("not a number");
            }, /Failed to map string to number/i);
            Assert.throws(() => {
                TC.parseInteger(undefined);
            }, /Value is undefined and not optional/i);
            Assert.throws(() => {
                TC.parseInteger("-1.2");
            }, /value must be a multiple of 1/i);
            Assert.throws(() => {
                TC.parseInteger("123455.0002");
            }, /value must be a multiple of 1/i);
            Assert.equal(undefined, TC.parseInteger(undefined, { optional: true }));
            Assert.equal(5, TC.parseInteger("5"));
        });
        it("should parse positive integers", function () {
            Assert.throws(() => {
                TC.parsePositiveInteger("-5");
            }, /value must be equal or greater than 0/i);
            Assert.equal(5, TC.parsePositiveInteger("5"));
        });
        it("should parse negative integers", function () {
            Assert.throws(() => {
                TC.parseNegativeInteger("5");
            }, /value must be equal or less than 0/i);
            Assert.equal(-5, TC.parseNegativeInteger("-5"));
        });
        it("should parse positive/negative integers not zero", function () {
            Assert.throws(() => {
                TC.parsePositiveNotZeroInteger("0");
            }, /value must be greater than 0/i);
            Assert.throws(() => {
                TC.parseNegativeNotZeroInteger("0");
            }, /value must be less than 0/i);
        });
    });
    describe("Booleans:", function () {
        it("should parse booleans", function () {
            Assert.throws(() => {
                TC.parseBoolean("not a boolean");
            }, /Invalid string to boolean cast/i);
            Assert.throws(() => {
                TC.parseBoolean(undefined);
            }, /Value is undefined and not optional/i);
            Assert.throws(() => {
                TC.parseBoolean(new Date());
            }, /Invalid type, expected 'Boolean'/i);
            Assert.throws(() => {
                TC.parseBoolean(5);
            }, /Invalid number to boolean cast/i);
            Assert.equal(undefined, TC.parseBoolean(undefined, { optional: true }));
            Assert.equal(true, TC.parseBoolean(true));
            Assert.equal(true, TC.parseBoolean(1));
            Assert.equal(true, TC.parseBoolean("tRuE"));
            Assert.equal(true, TC.parseBoolean("1"));
            Assert.equal(false, TC.parseBoolean(false));
            Assert.equal(false, TC.parseBoolean(0));
            Assert.equal(false, TC.parseBoolean("FalSE"));
            Assert.equal(false, TC.parseBoolean("0"));
        });
    });
    describe("Strings:", function () {
        it("should parse strings", function () {
            Assert.throws(() => {
                TC.parseString(undefined);
            }, /Value is undefined and not optional/i);
            Assert.throws(() => {
                TC.parseString("", { minLength: 1 });
            }, /String length constraint violation/i);
            Assert.throws(() => {
                TC.parseString("12", { maxLength: 1 });
            }, /String length constraint violation/i);
            Assert.equal(undefined, TC.parseString(undefined, { optional: true }));
            Assert.equal("true", TC.parseString(true));
        });
        it("should parse array patterns", function () {
            Assert.equal("banana", TC.parseStringPattern("banana", ["banana", "apple"]));
            Assert.throws(() => {
                TC.parseStringPattern("lemon", ["banana", "apple"]);
            }, /String pattern constraint violation/i);
        });
        it("should parse email", function () {
            Assert.equal("mr.a@test.co.jp", TC.parseEmail("mr.a@test.co.jp"));
            Assert.throws(() => {
                TC.parseEmail("www.ddg.gg");
            }, /String pattern constraint violation/i);
        });
        it("should parse url", function () {
            Assert.equal("https://test.com", TC.parseUrl("https://test.com"));
            Assert.throws(() => {
                TC.parseUrl("www.ddg.gg");
            }, /String pattern constraint violation/i);
        });
        it("should parse uuid", function () {
            Assert.equal("123e4567-e89b-12d3-a456-426655440000", TC.parseUUID("123e4567-e89b-12d3-a456-426655440000"));
            Assert.throws(() => {
                TC.parseUrl("123e4567-e89g-12d3-a456-426655440000");
            }, /String pattern constraint violation/i);
        });
        it("should parse string not whitespace", function () {
            Assert.equal(" !", TC.parseNotWhitespace(" !"));
            Assert.throws(() => {
                TC.parseNotWhitespace(`
                     
                
                `);
            }, /String pattern constraint violation/i);
        });
        it("should parse string not empty", function () {
            Assert.equal(" !", TC.parseStringNotEmpty(" !"));
            Assert.throws(() => {
                TC.parseStringNotEmpty("");
            }, /String length constraint violation/i);
        });
    });
    describe("Dates:", function () {
        it("should parse dates", function () {
            Assert.throws(() => {
                TC.parseDate(undefined);
            }, /Value is undefined and not optional/i);
            Assert.throws(() => {
                TC.parseDate("bananana");
            }, /Failed to map string to date/i);
            Assert.throws(() => {
                TC.parseDate(1);
            }, /Invalid type/i);
            Assert.equal(undefined, TC.parseDate(undefined, { optional: true }));
            let dateA = TC.parseDate("2017-02-23T19:01:50Z");
            let dateB = TC.parseDate("20170223T190150Z");
            let dateC = TC.parseDate("2017-02-23T16:01:50-03:00");
            Assert(Moment(dateA).isSame(dateB));
            Assert(Moment(dateA).isSame(dateC));
            Assert(Moment(dateB).isSame(dateC));
        });
        it("should parse custom dates", function () {
            let customDateFormat = "MM YYYY DD";
            Assert.throws(() => {
                TC.parseCustomDate(undefined, customDateFormat);
            }, /Value is undefined and not optional/i);
            Assert.throws(() => {
                TC.parseCustomDate("1/1/2012", customDateFormat);
            }, /Failed to map string to date/i);
            Assert.throws(() => {
                TC.parseCustomDate("13 2012 1", customDateFormat);
            }, /Failed to map string to date/i);
            Assert.throws(() => {
                TC.parseCustomDate(1, customDateFormat);
            }, /Invalid type/i);
            Assert.equal(undefined, TC.parseCustomDate(undefined, customDateFormat, undefined, { optional: true }));
            Assert(Moment("2017-02-23").isSame(TC.parseCustomDate("02 2017 23", customDateFormat)));
        });
    });
    describe("Arrays:", function () {
        it("should parse arrays", function () {
            Assert.throws(() => {
                TC.parseArray(undefined, TC.string());
            }, /Value is undefined and not optional/i);
            Assert.throws(() => {
                TC.parseArray(["a", "b", ""], TC.stringNotEmpty());
            }, /String length constraint violation/i);
            TC.parseArray(["a", "b", "c"], TC.string());
        });
    });
});
//# sourceMappingURL=test.js.map
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
class ForNumericTests {
}
__decorate([
    TC.Float(false),
    __metadata("design:type", Number)
], ForNumericTests.prototype, "optionalFloat", void 0);
__decorate([
    TC.PositiveFloat(true, 10),
    __metadata("design:type", Number)
], ForNumericTests.prototype, "positiveFloatMax10", void 0);
__decorate([
    TC.NegativeFloat(true, -10, true),
    __metadata("design:type", Number)
], ForNumericTests.prototype, "negativeFloatMinExclusiveMinus10", void 0);
__decorate([
    TC.PositiveFloatNotZero(),
    __metadata("design:type", Number)
], ForNumericTests.prototype, "positiveFloatNotZero", void 0);
__decorate([
    TC.NegativeFloatNotZero(),
    __metadata("design:type", Number)
], ForNumericTests.prototype, "negativeFloatNotZero", void 0);
__decorate([
    TC.Integer(),
    __metadata("design:type", Number)
], ForNumericTests.prototype, "integer", void 0);
__decorate([
    TC.PositiveInteger(true, 5, true),
    __metadata("design:type", Number)
], ForNumericTests.prototype, "positiveIntegerMaxExclusive5", void 0);
__decorate([
    TC.NegativeInteger(true, -5),
    __metadata("design:type", Number)
], ForNumericTests.prototype, "negativeIntegerMinMinus5", void 0);
__decorate([
    TC.PositiveIntegerNotZero(),
    __metadata("design:type", Number)
], ForNumericTests.prototype, "positiveIntegerNotZero", void 0);
__decorate([
    TC.NegativeIntegerNotZero(),
    __metadata("design:type", Number)
], ForNumericTests.prototype, "negativeIntegerNotZero", void 0);
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
    };
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
//# sourceMappingURL=test.js.map
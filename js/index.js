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
const tom_collins_1 = require("./tom-collins");
const TC = require("./tom-collins");
class Position {
}
__decorate([
    tom_collins_1.Field(),
    __metadata("design:type", Number)
], Position.prototype, "x", void 0);
__decorate([
    tom_collins_1.Field(),
    __metadata("design:type", Number)
], Position.prototype, "y", void 0);
class User {
}
__decorate([
    tom_collins_1.Field(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    tom_collins_1.Field(),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    tom_collins_1.Field({ minimum: 0 }),
    __metadata("design:type", Number)
], User.prototype, "age", void 0);
__decorate([
    tom_collins_1.Field({ pattern: TC.Patterns.Email }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    tom_collins_1.Field({ maps: TC.Maps.stringToDate }),
    __metadata("design:type", Date)
], User.prototype, "birthday", void 0);
__decorate([
    tom_collins_1.Field({ required: false }),
    __metadata("design:type", String)
], User.prototype, "optional", void 0);
__decorate([
    tom_collins_1.Field(),
    __metadata("design:type", Position)
], User.prototype, "pos", void 0);
try {
    let user = TC.parse(User, { name: "asdf", age: 0, id: "", birthday: new Date(), email: "arst@g.com", garbage: "LP*(L#$(*PL", pos: { x: 0, y: 0 } });
    console.log(user);
}
catch (e) {
    console.log(e);
}
//# sourceMappingURL=index.js.map
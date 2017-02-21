import { Field } from "./tom-collins";
import * as TC from "./tom-collins";


class Position {
    @Field()
    x: number;

    @Field()
    y: number;
}


class User {
    @Field()
    name: string;

    @Field()
    id: string;

    @Field({ minimum: 0 })
    age: number;

    @Field({ pattern: TC.Patterns.Email })
    email: string;

    @Field({ maps: TC.Maps.stringToDate })
    birthday: Date;

    @Field({ required: false })
    optional: string;

    @Field()
    pos: Position;
}

console.log(TC.printType(User));

try {
    let user = TC.parse(User, { name: "asdf", age: 0, id: "", birthday: new Date(), email: "arst@g.com", garbage: "LP*(L#$(*PL", pos: {} });
    console.log(user);
    console.log(TC.sampleSqlInsert(User, "Users", user));
} catch (e) {
    console.log(e);
}


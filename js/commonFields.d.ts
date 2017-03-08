import * as Parse from "./parse";
/**********************************
 * Strings
 **********************************/
export declare function StringField(constraints?: Parse.StringConstraints): (target: any, propertyKey: string | symbol) => void;
export declare function StringNotEmpty(constraints?: Parse.StringConstraints): (target: any, propertyKey: string | symbol) => void;
export declare function StringPattern(pattern: Parse.StringConstraintPattern, constraints?: Parse.StringConstraints): (target: any, propertyKey: string | symbol) => void;
export declare function Email(constraints?: Parse.StringConstraints): (target: any, propertyKey: string | symbol) => void;
export declare function NotWhitespace(constraints?: Parse.StringConstraints): (target: any, propertyKey: string | symbol) => void;
/**********************************
 * Booleans
 **********************************/
export declare function BooleanField(constraints?: Parse.StringConstraints): (target: any, propertyKey: string | symbol) => void;
/**********************************
 * Dates
 **********************************/
export declare function DateField(constraints?: Parse.StringConstraints): (target: any, propertyKey: string | symbol) => void;
export declare function CustomDate(format: string, nonStrict?: boolean, constraints?: Parse.StringConstraints): (target: any, propertyKey: string | symbol) => void;
/**********************************
 * Numbers
 **********************************/
export declare function Float(constraints?: Parse.NumberConstraints): (target: any, propertyKey: string | symbol) => void;
export declare function PositiveFloat(constraints?: Parse.NumberConstraints): (target: any, propertyKey: string | symbol) => void;
export declare function PositiveNotZeroFloat(constraints?: Parse.NumberConstraints): (target: any, propertyKey: string | symbol) => void;
export declare function NegativeFloat(constraints?: Parse.NumberConstraints): (target: any, propertyKey: string | symbol) => void;
export declare function NegativeNotZeroFloat(constraints?: Parse.NumberConstraints): (target: any, propertyKey: string | symbol) => void;
export declare function Integer(constraints?: Parse.NumberConstraints): (target: any, propertyKey: string | symbol) => void;
export declare function PositiveInteger(constraints?: Parse.NumberConstraints): (target: any, propertyKey: string | symbol) => void;
export declare function PositiveNotZeroInteger(constraints?: Parse.NumberConstraints): (target: any, propertyKey: string | symbol) => void;
export declare function NegativeInteger(constraints?: Parse.NumberConstraints): (target: any, propertyKey: string | symbol) => void;
export declare function NegativeNotZeroInteger(constraints?: Parse.NumberConstraints): (target: any, propertyKey: string | symbol) => void;
/**********************************
 * Arrays
 **********************************/
export declare function ArrayField(underlyingPO: Parse.ParseOptionsI, constraints?: Parse.ArrayConstraints): (target: any, propertyKey: string | symbol) => void;

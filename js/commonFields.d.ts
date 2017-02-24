import * as Fields from "./fields";
export declare function StringNotEmpty(required?: boolean, maxLength?: number, pattern?: Fields.StringConstraintPattern): (target: any, propertyKey: string | symbol) => void;
export declare function StringNotWhitespace(required?: boolean, maxLength?: number): (target: any, propertyKey: string | symbol) => void;
export declare function Email(required?: boolean): (target: any, propertyKey: string | symbol) => void;
export declare function StringPattern(pattern: Fields.StringConstraintPattern, required?: boolean, minLength?: number, maxLength?: number): (target: any, propertyKey: string | symbol) => void;
export declare function String(required?: boolean, minLength?: number, maxLength?: number, pattern?: Fields.StringConstraintPattern): (target: any, propertyKey: string | symbol) => void;
export declare function Boolean(required?: boolean): (target: any, propertyKey: string | symbol) => void;
export declare function Date(required?: boolean): (target: any, propertyKey: string | symbol) => void;
export declare function CustomDate(format: string, required?: boolean, nonStrict?: boolean): (target: any, propertyKey: string | symbol) => void;

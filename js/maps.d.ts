export declare class Map {
    type: any;
    map: (v: any) => any;
}
/**
 * Predefined maps.
 */
export declare class PredefinedMaps {
    static anyToDate: Map;
    static stringToCustomDate(format: string, nonStrict?: boolean): Map;
    static anyToString: Map;
    static stringToNumberWithCustomSeparators(decimalSeparator?: string, thousandSeparator?: string): Map;
    static stringToNumber: Map;
    static stringToBoolean: Map;
    static numberToBoolean: Map;
}

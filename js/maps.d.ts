export declare class Map {
    type: any;
    map: (v: any) => any;
}
/**
 * Predefined maps.
 */
export declare class PredefinedMaps {
    static stringToDate: Map;
    static stringToCustomDate(format: string, nonStrict?: boolean): Map;
    static anyToString: Map;
    static stringToNumber: Map;
    static stringToBoolean: Map;
    static numberToBoolean: Map;
}

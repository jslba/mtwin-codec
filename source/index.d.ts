declare class Codec {
    #private;
    constructor(key: string, version?: string);
    decode(data: string): string;
    encode(data: string): string;
}

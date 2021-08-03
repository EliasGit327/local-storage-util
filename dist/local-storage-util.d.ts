interface ILocalStorageValueParams {
    key: string;
    rule?: (value: any) => boolean;
    consoleMessages?: boolean;
}
export declare class LocalStorageValue {
    private readonly key;
    private readonly rule?;
    private readonly consoleMessages?;
    constructor(parameters: ILocalStorageValueParams);
    removeValue: () => void;
    set(value: any): void;
    get(): any;
    messageForDevs(message: string): void;
}
export {};

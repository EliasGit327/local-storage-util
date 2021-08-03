interface ILocalStorageValueParams<T> {
    key: string;
    rule?: (value: T) => boolean;
    consoleMessages?: boolean;
}
export declare class LocalStorageValue<T> {
    private readonly key;
    private readonly rule?;
    private readonly consoleMessages?;
    constructor(parameters: ILocalStorageValueParams<T>);
    removeValue: () => void;
    set(value: T): void;
    get(): T | undefined;
    messageForDevs(message: string): void;
}
export {};

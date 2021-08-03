export type LocalStorageOptions<T> = {
    name: string,
    key: string,
    defaultValue?: T;
    stringify?: boolean;
};
import { LocalStorageOptions } from "./local-storage-options";

export class LocalStorageValue<T> {
    options: LocalStorageOptions<T>;
    value: T | undefined;

    public constructor(options: LocalStorageOptions<T>) {
        this.options = options;

        if (options?.defaultValue) {
            this.value = this.options?.defaultValue;
        }
    };

    public get(): T {
        const result = localStorage.getItem(this.options.key);
        return result as any;
    }

    public set(value: T) {
        localStorage.setItem(this.options.key, value as any);
    }

}

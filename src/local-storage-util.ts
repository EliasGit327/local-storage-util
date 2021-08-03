interface ILocalStorageValueParams<T> {
    key: string;
    rule?: (value: T) => boolean;
    consoleMessages?: boolean;
}

export class LocalStorageValue<T> {
    private readonly key: string;
    private readonly rule?: (value: T) => boolean;
    private readonly consoleMessages?: boolean;

    constructor(parameters: ILocalStorageValueParams<T>) {
        this.key = parameters.key;
        this.rule = parameters.rule;
        if (parameters.consoleMessages) {
            this.consoleMessages = parameters.consoleMessages;
        }
    }

    public removeValue: () => void = () =>
        window.localStorage.removeItem(this.key);

    public set(value: T) {
        let valueInput = value;
        if (this.rule) {
            if (this.rule(valueInput)) {
                try {
                    valueInput = JSON.stringify(value) as any;
                } catch (e) {
                    if (this.consoleMessages) {
                        this.messageForDevs(`LOCAL STORAGE PARSE ERROR - '${valueInput}' couldn't be parsed to string!`);
                    }
                }
                window.localStorage.setItem(this.key, valueInput as any);
            } else {
                if (this.consoleMessages) {
                    this.messageForDevs(`LOCAL STORAGE SET OPERATION - Rule for value: '${valueInput}' with key: ${this.key} has been violated!`);
                }
            }
        } else {
            valueInput = JSON.stringify(value) as any;
            window.localStorage.setItem(this.key, valueInput as any);
        }
    }

    public get(): T | undefined {
        let locValue = window.localStorage.getItem(this.key);
        if (locValue === undefined || locValue === null) {
            return;
        }

        try {
            locValue = JSON.parse(locValue);

            if (this.rule) {
                if (this.rule(locValue as any)) {
                    return locValue as any;
                } else {
                    window.localStorage.removeItem(this.key);
                    if (this.consoleMessages) {
                        this.messageForDevs(`LOCAL STORAGE GET OPERATION - Rule for value: '${locValue}' with key: ${this.key} has been violated!`);
                    }
                    return;
                }
            }

        } catch (e) {
            if (this.consoleMessages) {
                this.messageForDevs(`LOCAL STORAGE PARSE ERROR - '${locValue}' couldn't be parsed!`);
            }
            window.localStorage.removeItem(this.key);
        }

        return locValue as any;
    }

    messageForDevs(message: string): void {
        console.warn(message);
    }
}

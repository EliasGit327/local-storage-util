interface ILocalStorageValueParams {
    key: string;
    rule?: (value: any) => boolean;
    consoleMessages?: boolean;
}

export class LocalStorageValue {
    private readonly key: string;
    private readonly rule?: (value: any) => boolean;
    private readonly consoleMessages?: boolean;

    constructor(parameters: ILocalStorageValueParams) {
        this.key = parameters.key;
        this.rule = parameters.rule;
        if (parameters.consoleMessages) {
            this.consoleMessages = parameters.consoleMessages;
        }
    }

    public removeValue: () => void = () =>
        window.localStorage.removeItem(this.key);

    public set(value: any) {
        let valueInput = value;
        if (this.rule) {
            if (this.rule(valueInput)) {
                try {
                    valueInput = JSON.stringify(value);
                } catch (e) {
                    if (this.consoleMessages) {
                        console.warn(`LOCAL STORAGE PARSE ERROR - '${valueInput}' couldn't be parsed to string!`);
                    }
                }
                window.localStorage.setItem(this.key, valueInput);
            } else {
                if (this.consoleMessages) {
                    console.warn(`LOCAL STORAGE SET OPERATION - Rule for value: '${valueInput}' with key: ${this.key} has been violated!`);
                }
            }
        } else {
            valueInput = JSON.stringify(value);
            window.localStorage.setItem(this.key, valueInput);
        }
    }

    public get(): any {
        let locValue = window.localStorage.getItem(this.key);
        if (locValue === undefined || locValue === null) {
            return;
        }

        try {
            locValue = JSON.parse(locValue);

            if (this.rule) {
                if (this.rule(locValue)) {
                    return locValue;
                } else {
                    window.localStorage.removeItem(this.key);
                    if (this.consoleMessages) {
                        console.warn(`LOCAL STORAGE GET OPERATION - Rule for value: '${locValue}' with key: ${this.key} has been violated!`);
                    }
                    return;
                }
            }
        } catch (e) {
            if (this.consoleMessages) {
                console.warn(`LOCAL STORAGE PARSE ERROR - '${locValue}' couldn't be parsed!`);
            }
            window.localStorage.removeItem(this.key);
        }

        return locValue;
    }

}

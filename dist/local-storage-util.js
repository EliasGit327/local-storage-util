"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStorageValue = void 0;
var LocalStorageValue = /** @class */ (function () {
    function LocalStorageValue(parameters) {
        var _this = this;
        this.removeValue = function () {
            return window.localStorage.removeItem(_this.key);
        };
        this.key = parameters.key;
        this.rule = parameters.rule;
        if (parameters.consoleMessages) {
            this.consoleMessages = parameters.consoleMessages;
        }
    }
    LocalStorageValue.prototype.set = function (value) {
        var valueInput = value;
        if (this.rule) {
            if (this.rule(valueInput)) {
                try {
                    valueInput = JSON.stringify(value);
                }
                catch (e) {
                    if (this.consoleMessages) {
                        this.messageForDevs("LOCAL STORAGE PARSE ERROR - '" + valueInput + "' couldn't be parsed to string!");
                    }
                }
                window.localStorage.setItem(this.key, valueInput);
            }
            else {
                if (this.consoleMessages) {
                    this.messageForDevs("LOCAL STORAGE SET OPERATION - Rule for value: '" + valueInput + "' with key: " + this.key + " has been violated!");
                }
            }
        }
        else {
            valueInput = JSON.stringify(value);
            window.localStorage.setItem(this.key, valueInput);
        }
    };
    LocalStorageValue.prototype.get = function () {
        var locValue = window.localStorage.getItem(this.key);
        if (locValue === undefined || locValue === null) {
            return;
        }
        try {
            locValue = JSON.parse(locValue);
        }
        catch (e) {
            if (this.consoleMessages) {
                this.messageForDevs("LOCAL STORAGE PARSE ERROR - '" + locValue + "' couldn't be parsed!");
            }
            window.localStorage.removeItem(this.key);
        }
        if (this.rule) {
            if (this.rule(locValue)) {
                return locValue;
            }
            else {
                window.localStorage.removeItem(this.key);
                if (this.consoleMessages) {
                    this.messageForDevs("LOCAL STORAGE GET OPERATION - Rule for value: '" + locValue + "' with key: " + this.key + " has been violated!");
                }
                return;
            }
        }
        return locValue;
    };
    LocalStorageValue.prototype.messageForDevs = function (message) {
        console.warn(message);
    };
    return LocalStorageValue;
}());
exports.LocalStorageValue = LocalStorageValue;
//# sourceMappingURL=local-storage-util.js.map
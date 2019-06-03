import 'whatwg-fetch';
import { IViaConnectSettings } from './models/interfaces/via-connect';
import { StorageItem } from './models/enums/local-storage';

export class Http {
    static getConfig(): Promise<IViaConnectSettings> {
        return window.fetch(`${CONFIG.apiUrl}/vc/settings`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${window['ViaToken']}`,
            },
        })
            .then(Http.handleErrors)
            .then(response => {
                return response.json();
            })
            .then((config: IViaConnectSettings) => {
                if (!config || !config.token) {
                    throw new Error('Token doesn\'t exist');
                }
                localStorage.setItem(StorageItem.Token, config.token);
                return config;
            });
    }

    static postMessage<T>(body: T): Promise<void> {
        const token = localStorage.getItem(StorageItem.Token);
        if (!token) {
            return Promise.reject(new Error('Token doesn\'t exist'));
        }
        return fetch(`${CONFIG.apiUrl}/vc/send`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
            .then(Http.handleErrors);
    }

    static handleErrors(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }
}

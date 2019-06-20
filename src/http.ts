import 'whatwg-fetch';
import { IViaConnectSettings } from './models/interfaces/via-connect';
import { StorageItem } from './models/enums/storage-item';

export class Http {
    static getConfig(): Promise<IViaConnectSettings> {
        return window.fetch(`${CONFIG.apiUrl}/vc/settings`, {
            headers: {
                Authorization: `Bearer ${window['ViaToken']}`,
            },
            method: 'GET',
        })
            .then(Http.handleErrors)
            .then(response => {
                return (<Response>response).json();
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
            body: JSON.stringify(body),
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            method: 'POST',
        })
            .then(Http.handleErrors)
            .then(() => {
                return;
            });
    }

    static handleErrors(response: Response): Error | Response {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }
}

import './styles/style.scss';
import 'classlist-polyfill';
import * as ES6Promise from 'es6-promise';
import { Form } from './form';
import { Http } from './http';
import { Logger } from './logger';

export class MainClass {
    constructor() {
        ES6Promise.polyfill();
        this.init();
    }

    init(): void {
        Logger.log('init');
        Logger.log(MainClass.isServer);
        if (MainClass.isServer) {
            return;
        }
        if (!window['ViaToken']) {
            console.error('Via connection token is required!');
            return;
        }
        Http.getConfig()
            .then(settings => {
                Logger.log(settings);
                new Form(settings).createForm();
            })
            .catch(e => console.error(e));
    }

    static get isServer(): boolean {
        return !(typeof window !== 'undefined' && window.document);
    }
}

new MainClass();

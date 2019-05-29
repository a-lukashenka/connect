import './styles/style.scss'
import { StylesConnector } from './styles-connector';
import * as dotenv from 'dotenv';

export class MainClass {
    constructor() {
        // const conf = dotenv.config();
        // console.log(conf);
        this.init()
    }

    init(): void {
        // const env: any = process.env;
        // console.log(env);
        new StylesConnector().init();
    }
}
new MainClass();

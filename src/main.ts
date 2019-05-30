import './styles/style.scss'
import { StylesConnector } from './styles-connector';

export class MainClass {
    constructor() {
        this.init()
    }

    init(): void {
        console.log(PRODUCTION, CONFIG);
        new StylesConnector().init();
    }
}
new MainClass();

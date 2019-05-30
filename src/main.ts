import './styles/style.scss'
import { Form } from './form';

export class MainClass {
    constructor() {
        this.init()
    }

    init(): void {
        new Form().createForm();
    }
}

new MainClass();

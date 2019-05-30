import './styles/style.scss'

export class MainClass {
    constructor() {
        this.init()
    }

    init(): void {
        console.log(CONFIG);
    }
}
new MainClass();

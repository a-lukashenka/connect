import { TestClass } from './test';

export class MainClass {
    constructor() {
        this.doSomething();
    }

    doSomething(): void {
        const a = new TestClass();
        console.log(a.a + 10);
    }
}
new MainClass();

import { TestClass } from '../dist/test';
var MainClass = /** @class */ (function () {
    function MainClass() {
        this.doSomething();
    }
    MainClass.prototype.doSomething = function () {
        var a = new TestClass();
        console.log(a.a + 10);
    };
    return MainClass;
}());
export { MainClass };
new MainClass();

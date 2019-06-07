export class Logger {
    static log(value: any): void {
        if (!CONFIG.prod) return;
        console.log(value);
    }
}

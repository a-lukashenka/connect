export class StylesConnector {
    init(): void {
        const cssPath = 'dist/main.css';
        const link = document.createElement('link');
        const head = document.getElementsByTagName('head')[0];
        let tmp;
        link.rel = 'stylesheet';
        tmp = link.cloneNode(true);
        tmp.href = cssPath;
        head.appendChild(tmp);
    }
}

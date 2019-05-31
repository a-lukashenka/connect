import { TEMPLATE } from './html';

export class Form {
    createForm(): void {
        // container
        const container = document.createElement('div');
        container.setAttribute('id', 'via-connect');
        container.innerHTML = TEMPLATE;
        document.body.appendChild(container);

        const headTitle = document.getElementById('header-title');
        const messageTitle = document.getElementById('message-title');
        const headTitleMessage = document.createTextNode('We\'ll text you!!');
        const messageText = document.createTextNode('Enter  your information below and our team will text you shortly!!');

        const form = document.getElementById('via-connect__form');
        form.onsubmit = function (e: Event) {
            e.preventDefault();
            console.log({
                name: form['name']['value'],
                phone: form['phone']['value'],
                message: form['message']['value'],
            });
        };
        headTitle.appendChild(headTitleMessage);
        messageTitle.appendChild(messageText);
    }
}

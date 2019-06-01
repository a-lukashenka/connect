import { CHAT_TEMPLATE } from './templates/chat-html';
import { CHAT_BUTTON_TEMPLATE } from './templates/chat-button-html';

export class Form {
    isVisible: boolean = false;
    createForm(): void {
        // container
        const container = document.createElement('div');
        const button = document.createElement('div');
        const body = document.body;
        container.setAttribute('id', 'via-connect');
        button.setAttribute('id', 'via-connect-btn-container');
        container.innerHTML = CHAT_TEMPLATE;
        button.innerHTML = CHAT_BUTTON_TEMPLATE;
        body.appendChild(button);
        body.appendChild(container);

        const headTitle = document.getElementById('header-title');
        const messageTitle = document.getElementById('message-title');
        const agreementTitle = document.getElementById('via-agreement');


        const headTitleText = document.createTextNode('We\'ll text you!!');
        const messageText = document.createTextNode('Enter  your information below and our team will text you shortly!!');
        const agreementText = document.createTextNode('By submitting you agree to receive text message at the number provided. Message/data rates apply.')

        const form = document.getElementById('via-connect__form');
        form.onsubmit = function (e: Event) {
            e.preventDefault();
            console.log({
                name: form['name']['value'],
                phone: form['phone']['value'],
                message: form['message']['value'],
            });
        };

        button.addEventListener('click', () => {
            this.isVisible = !this.isVisible;
            container.classList.toggle('visible', this.isVisible);
        });
        headTitle.appendChild(headTitleText);
        messageTitle.appendChild(messageText);
        agreementTitle.appendChild(agreementText);
    }
}

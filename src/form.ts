import { CHAT_TEMPLATE } from './templates/chat-html';
import { CHAT_BUTTON_TEMPLATE } from './templates/chat-button-html';
import { SUBMIT_FORM_TEMPLATE } from './templates/submit-form-html';
import { SUCCESS_FORM_TEMPLATE } from './templates/success-form-html';

export class Form {
    isVisible: boolean = false;
    isNewRequest: boolean = true;
    formContainer: HTMLElement;
    chatContainer: HTMLElement;

    createForm(): void {
        // container
        const body = document.body;

        this.chatContainer = document.createElement('div');
        const button = document.createElement('div');

        this.chatContainer.setAttribute('id', 'via-connect');
        button.setAttribute('id', 'via-connect-btn-container');

        this.chatContainer.innerHTML += CHAT_TEMPLATE;
        button.innerHTML += CHAT_BUTTON_TEMPLATE;

        body.appendChild(button);
        body.appendChild(this.chatContainer);

        button.addEventListener('click', () => {
            this.isVisible = !this.isVisible;
            this.setChatView();
        });

        this.formContainer = document.getElementById('via-connect__form-body');
        this.setView();
        this.setTitles();
        this.setChatView();
    }

    setView(): void {
        if (this.isNewRequest) {
            this.clearSuccessContainer();
            this.setFormContainer();
        } else {
            this.clearFormContainer();
            this.setSuccessContainer();
        }
    }

    setFormContainer(): void {
        if (!this.formContainer) return;
        this.formContainer.innerHTML += SUBMIT_FORM_TEMPLATE;

        const agreementTitle = document.getElementById('via-connect__agreement');
        const agreementText = document.createTextNode('By submitting you agree to receive text message at the number provided. Message/data rates apply.');
        agreementTitle.appendChild(agreementText);

        const form = document.getElementById('via-connect__form');
        form.onsubmit = (e: Event) => {
            e.preventDefault();
            console.log({
                name: form['name']['value'],
                phone: form['phone']['value'],
                message: form['message']['value'],
            });
            this.isNewRequest = false;
            this.setView();
        };
    }

    clearFormContainer(): void {
        const form = document.getElementById('via-connect__form');
        if (!form) return;
        form.parentNode.removeChild(form);
    }

    setSuccessContainer(): void {
        if (!this.formContainer) return;
        this.formContainer.innerHTML += SUCCESS_FORM_TEMPLATE;
    }

    clearSuccessContainer(): void {
        const form = document.getElementById('via-connect__form');
        if (!form) return;
        form.parentNode.removeChild(form);
    }

    setTitles(): void {
        const bannerTitle = document.getElementById('via-connect__banner');
        const initialMessageTitle = document.getElementById('via-connect__initial-message');


        const bannerTitleText = document.createTextNode('We\'ll text you!');
        const initialMessageTitleText = document.createTextNode('Enter  your information below and our team will text you shortly!!');

        bannerTitle.appendChild(bannerTitleText);
        initialMessageTitle.appendChild(initialMessageTitleText);
    }

    setChatView(): void {
        setTimeout(() => this.chatContainer.classList.toggle('visible', this.isVisible), 0);
    }
}

export const formClass = new Form();

import { CHAT_TEMPLATE } from './templates/chat-html';
import { CHAT_BUTTON_TEMPLATE } from './templates/chat-button-html';
import { SUBMIT_FORM_TEMPLATE } from './templates/submit-form-html';
import { SUCCESS_FORM_TEMPLATE } from './templates/success-form-html';
import { WELCOM_MESSAGE_TEMPLATE } from './templates/welcom-message-html';

export class Form {
    isChatVisible: boolean = false;
    isGreetingShouldShow: boolean = true;
    isNewRequest: boolean = true;

    formContainer: HTMLElement;
    chatContainer: HTMLElement;
    greetingContainer: HTMLElement;
    buttonContainer: HTMLElement;

    createForm(): void {
        const body = document.body;

        this.chatContainer = document.createElement('div');
        this.chatContainer.setAttribute('id', 'via-connect');

        this.buttonContainer = document.createElement('div');
        this.buttonContainer.setAttribute('id', 'via-connect-btn-container');

        this.greetingContainer = document.createElement('div');
        this.greetingContainer.setAttribute('id', 'via-connect-greeting-container');

        this.chatContainer.innerHTML += CHAT_TEMPLATE;
        this.buttonContainer.innerHTML += CHAT_BUTTON_TEMPLATE;
        this.greetingContainer.innerHTML += WELCOM_MESSAGE_TEMPLATE;

        body.appendChild(this.buttonContainer);
        body.appendChild(this.chatContainer);
        body.appendChild(this.greetingContainer);

        this.buttonContainer.addEventListener('click', () => {
            this.isChatVisible = !this.isChatVisible;
            this.toggleChatView();
            this.toggleGreetingView(true);
        });

        this.greetingContainer.addEventListener('click', () => {
            this.toggleGreetingView(true);
        });

        this.setChatView();
        this.setTitles();
        this.toggleChatView();
        this.toggleGreetingView();
    }

    setChatView(): void {
        this.formContainer = document.getElementById('via-connect__form-body');

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
            this.setChatView();
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

    toggleChatView(): void {
        setTimeout(() => this.chatContainer.classList.toggle('visible', this.isChatVisible), 0);
    }

    toggleGreetingView(close?: boolean): void {
        if (!this.isGreetingShouldShow ||
            this.parse(localStorage.getItem('via-connect__greeting_disabled'))) {
            return;
        }
        if (close) {
            this.isGreetingShouldShow = false;
            this.greetingContainer.classList.toggle('visible', false);
            localStorage.setItem('via-connect__greeting_disabled', 'true');
            return;
        }
        setTimeout(() => {
            if (this.isGreetingShouldShow) {
                this.greetingContainer.classList.toggle('visible', true);
            }
        }, 1000);
    }

    parse(value: string): boolean {
        try {
            return JSON.parse(value);
        } catch (e) {
            return false;
        }
    }
}

export const formClass = new Form();

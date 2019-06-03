import { CHAT_TEMPLATE } from './templates/chat-html';
import { CHAT_BUTTON_TEMPLATE } from './templates/chat-button-html';
import { SUBMIT_FORM_TEMPLATE } from './templates/submit-form-html';
import { SUCCESS_FORM_TEMPLATE } from './templates/success-form-html';
import { WELCOME_MESSAGE_TEMPLATE } from './templates/welcom-message-html';
import { IViaConnectForm, IViaConnectSettings } from './models/interfaces/via-connect';
import { AGREEMENT, BASE_SETTINGS } from './models/constants/base-settings';
import { StorageItem } from './models/enums/local-storage';
import { Http } from './http';

export class Form {
    config: IViaConnectSettings;
    isChatVisible: boolean = false;
    isGreetingShouldShow: boolean = true;
    isNewRequest: boolean = true;
    formData: IViaConnectForm;

    formContainer: HTMLElement;
    chatContainer: HTMLElement;
    greetingContainer: HTMLElement;
    buttonContainer: HTMLElement;

    constructor(config: IViaConnectSettings) {
        this.config = config;
    }

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
        this.greetingContainer.innerHTML += WELCOME_MESSAGE_TEMPLATE;

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
        this.setGreetingMessage();
        this.toggleChatView();
        this.toggleGreetingView();

        this.setButtonStyle();
        this.setHeaderStyle();
    }

    setGreetingMessage(): void {
        if (!this.greetingContainer) return;
        const img = document.getElementById('via-connect__greeting-img');
        const body = document.getElementById('via-connect__greeting-body');

        img.setAttribute('src', this.config.welcomeMessage.icon ||
            BASE_SETTINGS.welcomeMessage.icon);
        const bodyText = document.createTextNode(this.config.welcomeMessage.message ||
            BASE_SETTINGS.welcomeMessage.message);

        body.appendChild(bodyText);
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
        const agreementText = document.createTextNode(AGREEMENT);
        agreementTitle.appendChild(agreementText);

        this.setSubmitButtonStyle();

        const form = document.getElementById('via-connect__form');
        form.onsubmit = (e: Event) => {
            e.preventDefault();
            this.formData = {
                fName: form['fName']['value'],
                lName: form['lName']['value'],
                phone: form['phone']['value'],
                message: form['message']['value'],
            };
            this.sendForm();
        };
    }

    sendForm(): void {
        this.toggleLoader(true);
        Http.postMessage(this.formData)
            .then(() => {
                this.isNewRequest = false;
                this.toggleLoader(false);
                this.setChatView();
            })
            .catch(e => {
                this.toggleLoader(false);
                console.error(e);
            });
    }

    clearFormContainer(): void {
        const form = document.getElementById('via-connect__form');
        if (!form) return;
        form.parentNode.removeChild(form);
    }

    setSuccessContainer(): void {
        if (!this.formContainer) return;
        this.formContainer.innerHTML += SUCCESS_FORM_TEMPLATE;
        this.setSuccessMessage();
    }

    setSuccessMessage(): void {
        this.setCustomerMessage();
        this.setCompanyMessage();
    }

    setCustomerMessage(): void {
        const phone = document.getElementById('via-connect__customer-phone');
        const message = document.getElementById('via-connect__customer-message');

        const phoneText = document.createTextNode(this.formData.phone);
        const messageText = document.createTextNode(this.formData.message);

        phone.appendChild(phoneText);
        message.appendChild(messageText);
    }

    setCompanyMessage(): void {
        const phone = document.getElementById('via-connect__success_phone');
        const title = document.getElementById('via-connect__success_title');
        const body = document.getElementById('via-connect__success_message');

        const phoneText = document.createTextNode(this.config.dialogSettings.successMessage.phone ||
            BASE_SETTINGS.dialogSettings.successMessage.phone);
        const titleText = document.createTextNode(this.config.dialogSettings.successMessage.title ||
            BASE_SETTINGS.dialogSettings.successMessage.title);
        const bodyText = document.createTextNode(this.config.dialogSettings.successMessage.message ||
            BASE_SETTINGS.dialogSettings.successMessage.message);

        phone.appendChild(phoneText);
        title.appendChild(titleText);
        body.appendChild(bodyText);
    }

    clearSuccessContainer(): void {
        const form = document.getElementById('via-connect__form');
        if (!form) return;
        form.parentNode.removeChild(form);
    }

    setTitles(): void {
        const bannerTitle = document.getElementById('via-connect__banner');
        const initialMessageTitle = document.getElementById('via-connect__initial-message');

        const bannerTitleText = document.createTextNode(this.config.dialogSettings.title ||
            BASE_SETTINGS.dialogSettings.title);
        const initialMessageTitleText = document.createTextNode(this.config.dialogSettings.speech ||
            BASE_SETTINGS.dialogSettings.speech);

        bannerTitle.appendChild(bannerTitleText);
        initialMessageTitle.appendChild(initialMessageTitleText);
    }

    toggleChatView(): void {
        setTimeout(() => {
            this.chatContainer.classList.toggle('visible', this.isChatVisible);
        }, 0);
    }

    toggleLoader(state: boolean): void {
        const loader = document.getElementById('via-connect__form-body_loading');
        loader.classList.toggle('loading', state);
    }

    toggleGreetingView(close?: boolean): void {
        if (!this.isGreetingShouldShow ||
            localStorage.getItem(StorageItem.GreetingMessage)) {
            return;
        }
        if (close) {
            this.isGreetingShouldShow = false;
            this.greetingContainer.classList.toggle('visible', false);
            localStorage.setItem(StorageItem.GreetingMessage, 'true');
            return;
        }
        setTimeout(() => {
            if (this.isGreetingShouldShow) {
                this.greetingContainer.classList.toggle('visible', true);
            }
        }, 1000);
    }

    setButtonStyle(): void {
        const button = document.getElementById('via-connect-btn');

        button.style.color = this.config.theme.primaryColor || BASE_SETTINGS.theme.primaryColor;
        button.style.background = this.config.theme.primaryColor || BASE_SETTINGS.theme.primaryColor;
    }

    setSubmitButtonStyle(): void {
        const button = document.getElementById('via-connect__submit-btn');

        button.style.background = this.config.theme.primaryColor || BASE_SETTINGS.theme.primaryColor;
        button.style.color = this.config.theme.fontColor || BASE_SETTINGS.theme.fontColor;
    }

    setHeaderStyle(): void {
        const button = document.getElementById('via-connect__header-wrapper');

        button.style.background = this.config.theme.primaryColor || BASE_SETTINGS.theme.primaryColor;
        button.style.color = this.config.theme.fontColor || BASE_SETTINGS.theme.fontColor;
    }
}

import { CHAT_TEMPLATE } from './templates/chat-html';
import { CHAT_BUTTON_TEMPLATE } from './templates/chat-button-html';
import { SUBMIT_FORM_TEMPLATE } from './templates/submit-form-html';
import { SUCCESS_FORM_TEMPLATE } from './templates/success-form-html';
import { WELCOME_MESSAGE_TEMPLATE } from './templates/welcom-message-html';
import { IViaConnectForm, IViaConnectSettings } from './models/interfaces/via-connect';
import { AGREEMENT, BASE_SETTINGS } from './models/constants/base-settings';
import { StorageItem } from './models/enums/storage-item';
import { Http } from './http';
import { DDM } from './ddm';
import { Attribute } from './models/classes/attribute';

export class Form {
    config: IViaConnectSettings;
    isChatVisible: boolean = false;
    isGreetingShouldShow: boolean = true;
    isNewRequest: boolean = true;
    formData: IViaConnectForm;
    iframe: any;

    formContainer: HTMLElement;
    chatContainer: HTMLElement;
    greetingContainer: HTMLElement;
    buttonContainer: HTMLElement;

    constructor(config: IViaConnectSettings) {
        this.config = config;
        this.iframe = document.createElement('iframe');
    }

    createForm(): void {
        const body = document.body;

        this.chatContainer = DDM.create(
            'div', [new Attribute('id', 'via-connect')], CHAT_TEMPLATE,
        );
        this.buttonContainer = DDM.create(
            'div', [new Attribute('id', 'via-connect-btn-container')], CHAT_BUTTON_TEMPLATE,
        );
        this.greetingContainer = DDM.create(
            'div', [new Attribute('id', 'via-connect-greeting-container')], WELCOME_MESSAGE_TEMPLATE,
        );

        DDM.append(body, this.buttonContainer);
        DDM.append(body, this.chatContainer);
        DDM.append(body, this.greetingContainer);

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
        const img = DDM.get('via-connect__greeting-img');
        const body = DDM.get('via-connect__greeting-body');

        DDM.setAttribute(img, new Attribute('src', this.config.welcomeMessage.icon ||
            BASE_SETTINGS.welcomeMessage.icon));
        const bodyText = DDM.createTextNode(this.config.welcomeMessage.message ||
            BASE_SETTINGS.welcomeMessage.message);

        DDM.append(body, bodyText);
    }

    setChatView(): void {
        this.formContainer = DDM.get('via-connect__form-body');

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
        DDM.setHtml(this.formContainer, SUBMIT_FORM_TEMPLATE);

        const agreementTitle = DDM.get('via-connect__agreement');
        const agreementText = DDM.createTextNode(AGREEMENT);
        DDM.append(agreementTitle, agreementText);

        this.setSubmitButtonStyle();

        const form = DDM.get('via-connect__form');
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
        const form = DDM.get('via-connect__form');
        if (!form) return;
        DDM.remove(form);
    }

    setSuccessContainer(): void {
        if (!this.formContainer) return;
        DDM.setHtml(this.formContainer, SUCCESS_FORM_TEMPLATE);
        this.setSuccessMessage();
    }

    setSuccessMessage(): void {
        this.setCustomerMessage();
        this.setCompanyMessage();
    }

    setCustomerMessage(): void {
        const phone = DDM.get('via-connect__customer-phone');
        const message = DDM.get('via-connect__customer-message');

        const phoneText = DDM.createTextNode(this.formData.phone);
        const messageText = DDM.createTextNode(this.formData.message);

        DDM.append(phone, phoneText);
        DDM.append(message, messageText);
    }

    setCompanyMessage(): void {
        const phone = DDM.get('via-connect__success_phone');
        const title = DDM.get('via-connect__success_title');
        const body = DDM.get('via-connect__success_message');

        const phoneText = DDM.createTextNode(this.config.dialogSettings.successMessage.phone ||
            BASE_SETTINGS.dialogSettings.successMessage.phone);
        const titleText = DDM.createTextNode(this.config.dialogSettings.successMessage.title ||
            BASE_SETTINGS.dialogSettings.successMessage.title);
        const bodyText = DDM.createTextNode(this.config.dialogSettings.successMessage.message ||
            BASE_SETTINGS.dialogSettings.successMessage.message);

        DDM.append(phone, phoneText);
        DDM.append(title, titleText);
        DDM.append(body, bodyText);
    }

    clearSuccessContainer(): void {
        const success = DDM.get('via-connect_success');
        if (!success) return;
        DDM.remove(success)
    }

    setTitles(): void {
        const bannerTitle = DDM.get('via-connect__banner');
        const initialMessageTitle = DDM.get('via-connect__initial-message');

        const bannerTitleText = DDM.createTextNode(this.config.dialogSettings.title ||
            BASE_SETTINGS.dialogSettings.title);
        const initialMessageTitleText = DDM.createTextNode(this.config.dialogSettings.speech ||
            BASE_SETTINGS.dialogSettings.speech);

        DDM.append(bannerTitle, bannerTitleText);
        DDM.append(initialMessageTitle, initialMessageTitleText);
    }

    toggleChatView(): void {
        setTimeout(() => {
            this.chatContainer.classList.toggle('via-connect__visible', this.isChatVisible);
        }, 0);
    }

    toggleLoader(state: boolean): void {
        const loader = DDM.get('via-connect__form-body_loading');
        loader.classList.toggle('via-connect__loading', state);
    }

    toggleGreetingView(close?: boolean): void {
        if (!this.isGreetingShouldShow ||
            sessionStorage.getItem(StorageItem.GreetingMessage)) {
            return;
        }
        if (close) {
            this.isGreetingShouldShow = false;
            this.greetingContainer.classList.toggle('via-connect__visible', false);
            sessionStorage.setItem(StorageItem.GreetingMessage, 'true');
            return;
        }
        setTimeout(() => {
            if (this.isGreetingShouldShow) {
                this.greetingContainer.classList.toggle('via-connect__visible', true);
            }
        }, 10000);
    }

    setButtonStyle(): void {
        const button = DDM.get('via-connect-btn');

        button.style.color = this.config.theme.primaryColor || BASE_SETTINGS.theme.primaryColor;
        button.style.background = this.config.theme.primaryColor || BASE_SETTINGS.theme.primaryColor;
    }

    setSubmitButtonStyle(): void {
        const button = DDM.get('via-connect__submit-btn');

        button.style.background = this.config.theme.primaryColor || BASE_SETTINGS.theme.primaryColor;
        button.style.color = this.config.theme.fontColor || BASE_SETTINGS.theme.fontColor;
    }

    setHeaderStyle(): void {
        const button = DDM.get('via-connect__header-wrapper');

        button.style.background = this.config.theme.primaryColor || BASE_SETTINGS.theme.primaryColor;
        button.style.color = this.config.theme.fontColor || BASE_SETTINGS.theme.fontColor;
    }
}

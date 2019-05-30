export class Form {
    createForm(): void {
        // container
        const container = document.createElement('div');
        container.setAttribute('id', 'via-connect');

        // form wrapper
        const formWrapper = document.createElement('div');
        formWrapper.setAttribute('id', 'via-connect__form-wrapper');

        // form header
        const header = document.createElement('div');
        header.setAttribute('id', 'via-connect__header-wrapper');

        const headTitle = document.createElement('p');
        const headTitleMessage = document.createTextNode('We\'ll text you');

        // form body
        const formBody = document.createElement('div');
        formBody.setAttribute('id', 'via-connect__form-body');

        // message wrapper left
        const messageWrapper1 = document.createElement('div');
        const infoMessage = document.createElement('p');
        const infoMessageText = document.createTextNode('Enter  your information below and our team will text you shortly.');
        messageWrapper1.setAttribute('id', 'via-connect__message-wrapper');
        messageWrapper1.classList.add('blue');

        // message wrapper right
        const messageWrapper2 = document.createElement('div');
        messageWrapper2.setAttribute('id', 'via-connect__message-wrapper');
        messageWrapper2.classList.add('right');


        // form
        const form = document.createElement('form');
        form.setAttribute('id', 'via-connect__form');
        form.setAttribute('method', 'post');
        form.setAttribute('action', 'submit.php');

        const i = document.createElement('input'); //input element, text
        i.setAttribute('type', 'text');
        i.setAttribute('name', 'username');

        const s = document.createElement('input'); //input element, Submit button
        s.setAttribute('type', 'submit');
        s.setAttribute('value', 'Submit');


        container.appendChild(formWrapper);
        formWrapper.appendChild(header);

        header.appendChild(headTitle);
        headTitle.appendChild(headTitleMessage);
        formWrapper.appendChild(formBody);

        formBody.appendChild(messageWrapper1);
        formBody.appendChild(messageWrapper2);
        infoMessage.appendChild(infoMessageText);
        messageWrapper1.appendChild(infoMessage);
        messageWrapper2.appendChild(form);

        form.appendChild(i);
        form.appendChild(s);

        // end form

//and some more input elements here
//and dont forget to add a submit button

        document.getElementsByTagName('body')[0].appendChild(container);
    }
}

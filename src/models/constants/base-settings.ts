import {
    IViaConnectSettings,
} from '../interfaces/via-connect';

export const BASE_SETTINGS: IViaConnectSettings = {
    theme: {
        primaryColor: '#3677e0',
        fontColor: '#fff',
    },
    welcomeMessage: {
        message: 'Hi there! Did you have any questions, or do  you need help setting up an appointment?',
        icon: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8c3ZnDQoJdmVyc2lvbj0iMS4xIg0KCXhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyINCgl4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayINCgl3aWR0aD0iNjAwIg0KCWhlaWdodD0iNjAwIg0KCWZpbGw9IndoaXRlIj4NCg0KICA8dGl0bGU+QWJzdHJhY3QgdXNlciBpY29uPC90aXRsZT4NCg0KICA8ZGVmcz4NCiAgICA8Y2xpcFBhdGggaWQ9ImNpcmN1bGFyLWJvcmRlciI+DQogICAgICA8Y2lyY2xlIGN4PSIzMDAiIGN5PSIzMDAiIHI9IjI1MCIgLz4NCiAgICA8L2NsaXBQYXRoPg0KICA8L2RlZnM+DQoNCiAgPGNpcmNsZSBjeD0iMzAwIiBjeT0iMzAwIiByPSIyODAiIGZpbGw9IiNjOGM4YzgiIC8+DQogIDxjaXJjbGUgY3g9IjMwMCIgY3k9IjIzMCIgcj0iMTAwIiAvPg0KICA8Y2lyY2xlIGN4PSIzMDAiIGN5PSI1NTAiIHI9IjE5MCIgY2xpcC1wYXRoPSJ1cmwoI2NpcmN1bGFyLWJvcmRlcikiIC8+DQo8L3N2Zz4=',
    },
    dialogSettings: {
        title: 'We\'ll text you!',
        speech: 'Enter your information below and our team will text you shortly.',
        successMessage: {
            phone: '--/--',
            title: 'We got your message!',
            message: 'Our team will be texting you back from the number above.',
        },
    },
};

export const AGREEMENT: string = 'By submitting you agree to receive text message at the number provided. Message/data rates apply.';

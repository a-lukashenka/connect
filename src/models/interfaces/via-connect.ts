export interface IViaConnectSettings {
    _id?: string;
    token?: string;
    locationId?: string;
    theme: IViaConnectTheme;
    welcomeMessage: IViaConnectWelcomeMessage;
    dialogSettings: IViaConnectDialogSettings;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IViaConnectTheme {
    primaryColor: string;
    fontColor: string;
}

export interface IViaConnectWelcomeMessage {
    message: string;
    icon: string;
    frequency?: number;
}

export interface IViaConnectDialogSettings {
    title: string;
    speech: string;
    successMessage: {
        phone?: string;
        title: string;
        message: string;
    };
}

export interface IViaConnectForm {
    fName: string;
    lName?: string;
    phone: string;
    message: string;
}

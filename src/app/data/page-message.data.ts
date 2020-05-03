import { AlertType } from '../fragments/alert/AlertTypes';

export class PageMessageData {
    public active: boolean;
    public message: string;
    public alertType: AlertType;
    constructor(message: string, active: boolean, alertType: AlertType) {
        this.active = active;
        this.message = message;
        this.alertType = alertType;
        console.info("event message emitted: ", this);
    }
}
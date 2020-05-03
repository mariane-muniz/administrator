export class EventInfo {
    code: string;
    entity: string;
    action: string;

    constructor(entity: string, code: string, action: string) {
        this.action = action;
        this.entity = entity;
        this.code = code;
    }
}
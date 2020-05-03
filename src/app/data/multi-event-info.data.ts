export class MultiEventInfoData {
    constructor(type: string, items: []) {
        this.type = type;
        this.items = items;
        console.info("event multi emitted: ", this);
    }
    type: string;
    items;
}
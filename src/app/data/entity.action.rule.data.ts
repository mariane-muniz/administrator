export class EntityActionRuleData {
    multiple: boolean;
    existent: boolean;
    entity: string;
    code: string;
    createdAt: string;
    updatedAt: string;
    text: string;
    rules: string;
    disabled: boolean;
    
    constructor(entity: string, multiple: boolean, existent: boolean) {
        this.entity = entity;
        this.multiple = multiple;
        this.existent = existent;
    }
}
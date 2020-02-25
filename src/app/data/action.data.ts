export interface ActionData {
  execute: string;
  text: string;
  icon: string;
  link: string;
  condition: string;
  btnType: string;
  actions: ActionData[];
}

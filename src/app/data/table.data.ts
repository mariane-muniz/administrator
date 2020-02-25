import {ActionGroupData} from './action.group.data';

export interface TableData {
  actionGroups: ActionGroupData[];
  displayPagination: boolean;
  title: string;
  fields: string[];
  selected: any[];
  values: any[];
}

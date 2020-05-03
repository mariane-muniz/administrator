import { Injectable } from '@angular/core';
import { ActionParameterData } from '../data/action-parameter.data';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  private MORE_THAN_SIZE = 'MT_[size]_';
  private LESS_THAN_SIZE = 'LT_[size]_';

  constructor() { }

  public validateAction(parameter: ActionParameterData): boolean {
    let rules: string[] = parameter.action.rules.split(',');
    for (let i = 0; i < rules.length; i++) {
      if (rules[i].includes(this.MORE_THAN_SIZE) && !this.moreThan(rules[i], parameter.size)) return true;
      else if (rules[i].includes(this.LESS_THAN_SIZE) && !this.lessThan(rules[i], parameter.size)) return true;
    }
    return false;
  }

  private moreThan(rule: string, value: number): boolean {
    let ruleSize = rule;
    ruleSize = ruleSize.replace(this.MORE_THAN_SIZE, "");
    return parseInt(ruleSize) < value;
  }

  private lessThan(rule: string, value: number): boolean {
    let ruleSize = rule;
    ruleSize = ruleSize.replace(this.LESS_THAN_SIZE, "");
    return parseInt(ruleSize) > value;
  }
}
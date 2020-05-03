import { Component, Input } from '@angular/core';

import { AdComponent }      from './ad.component';
import { EntityActionRuleData } from '../data/entity.action.rule.data';

@Component({
  template: `
    <div class="job-ad">
      <h4>{{data.headline}}</h4>

      {{data.body}}
    </div>
  `
})
export class HeroJobAdComponent implements AdComponent {
  link: EntityActionRuleData;
  data: any;
}


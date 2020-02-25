import {Injectable} from '@angular/core';

import {HeroProfileComponent} from './hero-profile.component';
import {AdItem} from './ad-item';
import {TableComponent} from './components/table/table.component';
import {ClarityFormComponent} from './components/clarity-form/clarity-form.component';

@Injectable()
export class AdService {

  components: Map<string, any> = new Map<string, any>([
    ['test', HeroProfileComponent],
    ['table', TableComponent],
    ['form', ClarityFormComponent]
  ]);

  getComponent(name: string, cLink: any): any {
    const component = this.components.get(name);
    return component != null
      ? new AdItem(component, cLink) : null;
  }
}

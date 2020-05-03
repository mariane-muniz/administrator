import {Component, Input, OnInit, ViewChild, ComponentFactoryResolver} from '@angular/core';

import {AdDirective} from './ad.directive';
import {AdComponent} from './ad.component';
import {AdService} from './ad.service';
import { EntityActionRuleData } from '../data/entity.action.rule.data';

@Component({
  selector: 'app-ad-banner',
  template: `<ng-template ad-host></ng-template>`
})
export class AdBannerComponent implements OnInit {

  @Input() type: string;
  @Input() link: EntityActionRuleData;
  @ViewChild(AdDirective, {static: true}) adHost: AdDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private adService: AdService) {
  }

  ngOnInit() {
    const adItem = this.adService.getComponent(this.type, this.link);
    if (adItem !== null) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);
      const viewContainerRef = this.adHost.viewContainerRef;
      const componentRef = viewContainerRef.createComponent(componentFactory);
      (<AdComponent> componentRef.instance).link = adItem.data;
    } else {
      console.error('Fail on get component this type: ' + this.type);
    }
  }
}

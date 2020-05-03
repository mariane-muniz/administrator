import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeroJobAdComponent} from '../binding/hero-job-ad.component';
import {HeroProfileComponent} from '../binding/hero-profile.component';
import {ClarityModule, ClrDropdownModule, ClrIconModule, ClrModalModule} from '@clr/angular';
import { BtnMenuComponent } from './btn-menu/btn-menu.component';
import { AlertComponent } from './alert/alert.component';

export const fragments: any[] = [
  HeroJobAdComponent,
  HeroProfileComponent,
  BtnMenuComponent,
  AlertComponent
];

@NgModule({
  declarations: fragments,
  exports: fragments,
  entryComponents: fragments,
  imports: [
    CommonModule,
    ClrIconModule,
    ClrDropdownModule,
    ClrModalModule,
    ClarityModule
  ]
})
export class FragmentModule { }

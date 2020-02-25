import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeroJobAdComponent} from '../hero-job-ad.component';
import {HeroProfileComponent} from '../hero-profile.component';
import {TableActionsComponent} from './table-actions/table-actions.component';
import {ClarityModule, ClrDropdownModule, ClrIconModule, ClrModalModule} from '@clr/angular';

export const fragments: any[] = [
  HeroJobAdComponent,
  HeroProfileComponent,
  TableActionsComponent
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

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SubnavComponent} from './subnav/subnav.component';
import {HeaderComponent} from './header/header.component';
import {HeaderAlertComponent} from './header-alert/header-alert.component';
import {ClarityModule, ClrIconModule} from '@clr/angular';
import {SidebarComponent} from './sidebar/sidebar.component';
import {RouterModule} from '@angular/router';
import {TableComponent} from './table/table.component';
import {FragmentModule} from '../fragments/fragment.module';
import {ModalComponent} from './modal/modal.component';
import {TabComponent} from './tab/tab.component';
import {AdService} from '../binding/ad.service';
import {AdBannerComponent} from '../binding/ad-banner.component';
import {AdDirective} from '../binding/ad.directive';
import {ClarityFormComponent} from './clarity-form/clarity-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export const entryComponents: any[] = [
  SubnavComponent,
  HeaderComponent,
  HeaderAlertComponent,
  SidebarComponent,
  TableComponent,
  ModalComponent,
  TabComponent,
  AdBannerComponent,
  ClarityFormComponent
];

export const components: any[] = [];
components.push(entryComponents, AdDirective);

@NgModule({
  declarations: components,
  exports: components,
  entryComponents: entryComponents,
  providers: [AdService],
  imports: [
    CommonModule,
    ClrIconModule,
    RouterModule,
    ClarityModule,
    FragmentModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ComponentsModule {
}

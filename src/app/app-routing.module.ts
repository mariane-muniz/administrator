import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {LoginComponent} from './pages/login/login.component';
import {TableComponent} from './pages/table/table.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {CardsComponent} from './pages/cards/cards.component';
import {TabComponent} from './pages/tab/tab.component';
import {ActionEditorComponent} from './pages/action-editor/action-editor.component';
import { AuthGuard } from './services/AuthGuard';
import { ModelingComponent } from './pages/modeling/modeling.component';

const routes: Routes = [
  {path: '', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'table/:entity', component: TableComponent, canActivate: [AuthGuard]},
  {path: 'card/:entity', component: CardsComponent, canActivate: [AuthGuard]},
  {path: 'tab/:entity/:code', component: TabComponent, canActivate: [AuthGuard]},
  {path: 'tab/:entity', component: TabComponent, canActivate: [AuthGuard]},
  {path: 'tab', component: TabComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'accordion', component: ActionEditorComponent, canActivate: [AuthGuard]},
  {path: '404', component: NotFoundComponent, canActivate: [AuthGuard]},
  {path: 'modeling', component: ModelingComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}


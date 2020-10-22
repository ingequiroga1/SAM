import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BaseListComponent} from './base-list/base-list.component';
import {BaseDetailComponent} from './base-detail/base-detail.component';
import {BaseAddComponent} from './base-add/base-add.component';



const routes: Routes = [
  {path:'list', component:BaseListComponent},
  // {path:'details',component:BaseDetailComponent},
  {path:'add',component:BaseAddComponent},
  {path: 'details/:id',
  component: BaseDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasesRoutingModule { }

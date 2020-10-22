import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ClientListComponent} from './client-list/client-list.component';
import {ClientDetailsComponent} from './client-details/client-details.component';
import {ClientAddComponent} from './client-add/client-add.component';
import {DetailBaseClientComponent} from './detail-base-client/detail-base-client.component';
import {AddBaseClientComponent} from './add-base-client/add-base-client.component';
import {ClientsBasesComponent} from './clients-bases/clients-bases.component';
const routes: Routes = [
  { path: 'list', component: ClientListComponent},
  {path: 'details/:id', component: ClientDetailsComponent},
  { path: 'add', component: ClientAddComponent},
  {path:'detail-base-client', component: DetailBaseClientComponent},
  {path:'add-base-client', component: AddBaseClientComponent},
  {path:'clients-bases',component:ClientsBasesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }

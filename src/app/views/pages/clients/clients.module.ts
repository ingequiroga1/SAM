import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientDetailsComponent } from './client-details/client-details.component';
import {CommonsModule} from '../../../commons/commons.module';
import { ClientAddComponent } from './client-add/client-add.component';
import { DetailBaseClientComponent } from './detail-base-client/detail-base-client.component';
import { AddBaseClientComponent } from './add-base-client/add-base-client.component';
import { ClientsBasesComponent } from './clients-bases/clients-bases.component';

import { MatInputModule } from '@angular/material/input';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { BaseEffects, basesReducer } from 'src/app/core/manage_bases';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [ClientListComponent, ClientDetailsComponent, ClientAddComponent, DetailBaseClientComponent, AddBaseClientComponent, ClientsBasesComponent],
  imports: [
    CommonModule,
    CommonsModule,
    ClientsRoutingModule,
    MatInputModule,
    MaterialFileInputModule,
    // StoreModule.forFeature('bases', basesReducer),
    // EffectsModule.forFeature([BaseEffects]),
  ] 
  
  
})
export class ClientsModule { }

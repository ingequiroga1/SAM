import { NgModule , ModuleWithProviders
} from '@angular/core';
import { CommonModule  } from '@angular/common';
import {ToolbarService} from './toolbar.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ServiceModule {
  static forRoot(): ModuleWithProviders<ServiceModule> {
    return {
      ngModule: ServiceModule,
      providers: [
        ToolbarService
      ]
    };
  }
 }

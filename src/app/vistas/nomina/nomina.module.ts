import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NominaRoutingModule } from './nomina-routing.module';
import { NominaComponent } from './nomina.component';


@NgModule({
  declarations: [
    NominaComponent
  ],
  imports: [
    CommonModule,
    NominaRoutingModule
  ]
})
export class NominaModule { }

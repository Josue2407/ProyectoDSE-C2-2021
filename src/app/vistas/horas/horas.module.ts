import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HorasRoutingModule } from './horas-routing.module';
import { HorasComponent } from './horas.component';


@NgModule({
  declarations: [
    HorasComponent
  ],
  imports: [
    CommonModule,
    HorasRoutingModule
  ]
})
export class HorasModule { }

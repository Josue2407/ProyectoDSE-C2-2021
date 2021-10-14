import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InformacionEmpleadoRoutingModule } from './informacion-empleado-routing.module';
import { InformacionEmpleadoComponent } from './informacion-empleado.component';


@NgModule({
  declarations: [
    InformacionEmpleadoComponent
  ],
  imports: [
    CommonModule,
    InformacionEmpleadoRoutingModule
  ]
})
export class InformacionEmpleadoModule { }

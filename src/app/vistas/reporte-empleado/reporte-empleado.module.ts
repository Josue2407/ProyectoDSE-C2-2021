import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReporteEmpleadoRoutingModule } from './reporte-empleado-routing.module';
import { ReporteEmpleadoComponent } from './reporte-empleado.component';

@NgModule({
  declarations: [
    ReporteEmpleadoComponent
  ],
  imports: [
    CommonModule,
    ReporteEmpleadoRoutingModule
  ]
})
export class ReporteEmpleadoModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReporteEmpleadoComponent } from './reporte-empleado.component';

const routes: Routes = [
  {
    path: '',
    component: ReporteEmpleadoComponent,
    data: {
      title: 'Reporte Empleado'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReporteEmpleadoRoutingModule { }

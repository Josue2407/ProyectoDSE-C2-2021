import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InformacionEmpleadoComponent } from './informacion-empleado.component';

const routes: Routes = [
  {
    path: '',
    component: InformacionEmpleadoComponent,
    data: {
      title: 'Informacion Empleado'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InformacionEmpleadoRoutingModule { }

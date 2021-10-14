import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NuevoPermisoComponent } from './nuevo-permiso.component';

const routes: Routes = [
  {
    path: '',
    component: NuevoPermisoComponent,
    data: {
      title: 'Nuevo Permiso'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NuevoPermisoRoutingModule { }

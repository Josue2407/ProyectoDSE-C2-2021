import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolicitudPermisoComponent } from './solicitud-permiso.component';

const routes: Routes = [
  {
    path: '',
    component: SolicitudPermisoComponent,
    data: {
      title: 'Solicitud Permiso'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudPermisoRoutingModule { }

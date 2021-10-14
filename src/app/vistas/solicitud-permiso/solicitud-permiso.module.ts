import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitudPermisoRoutingModule } from './solicitud-permiso-routing.module';
import { SolicitudPermisoComponent } from './solicitud-permiso.component';

@NgModule({
  declarations: [
    SolicitudPermisoComponent
  ],
  imports: [
    CommonModule,
    SolicitudPermisoRoutingModule
  ]
})
export class SolicitudPermisoModule { }

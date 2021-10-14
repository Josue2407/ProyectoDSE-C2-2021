import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NuevoPermisoRoutingModule } from './nuevo-permiso-routing.module';
import { NuevoPermisoComponent } from './nuevo-permiso.component';

@NgModule({
  declarations: [
    NuevoPermisoComponent
  ],
  imports: [
    CommonModule,
    NuevoPermisoRoutingModule
  ]
})
export class NuevoPermisoModule { }

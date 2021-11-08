import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { NuevoPermisoRoutingModule } from './nuevo-permiso-routing.module';
import { NuevoPermisoComponent } from './nuevo-permiso.component';

import { ModalModule } from 'ngx-bootstrap/modal'

@NgModule({
  declarations: [
    NuevoPermisoComponent
  ],
  imports: [
    CommonModule,
    NuevoPermisoRoutingModule,
    FormsModule
  ]
})
export class NuevoPermisoModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmpleadosRoutingModule } from './empleados-routing.module';
import { EmpleadosComponent } from './empleados.component';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    EmpleadosComponent,
  ],
  imports: [
    CommonModule,
    EmpleadosRoutingModule,
    FormsModule
  ]
})
export class EmpleadosModule { }

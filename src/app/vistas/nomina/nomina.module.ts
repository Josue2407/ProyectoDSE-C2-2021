import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NominaRoutingModule } from './nomina-routing.module';
import { NominaComponent } from './nomina.component';


@NgModule({
  declarations: [
    NominaComponent
  ],
  imports: [
    CommonModule,
    NominaRoutingModule,
    FormsModule
  ]
})
export class NominaModule { }

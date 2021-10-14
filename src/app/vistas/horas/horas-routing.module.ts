import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HorasComponent } from './horas.component';

const routes: Routes = [
  {
    path: '',
    component: HorasComponent,
    data: {
      title: 'Horas'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HorasRoutingModule { }

import { Injectable } from '@angular/core';

//Firebase
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';

//Model
import { Marcacion } from '../models/marcacion';

@Injectable({
  providedIn: 'root'
})
export class MarcacionService {

  marcacionesList:AngularFireList<any>;

  constructor( private firebase:AngularFireDatabase) { }

  getMarcaciones(){
    return this.marcacionesList = this.firebase.list('marcaciones');
  }

  updateMarcacion(marcacion:Marcacion){
    this.marcacionesList.update(marcacion.$key,{   
      dui: marcacion.dui,
      fecha: marcacion.fecha,
      horaEntrada:marcacion.horaEntrada,
      horaSalidaAlmuerzo:marcacion.horaSalidaAlmuerzo,
      horaEntradaAlmuerzo:marcacion.horaEntradaAlmuerzo,
      horaSalida:marcacion.horaSalida,
      minutosTardes:0
    });
  }
}

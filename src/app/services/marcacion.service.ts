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
}

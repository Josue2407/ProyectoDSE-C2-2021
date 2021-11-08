import { Injectable } from '@angular/core';

//Firebase
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';

//Model
import { Permiso } from '../models/permiso';


@Injectable({
  providedIn: 'root'
})
export class PermisoService {
  permisoList:AngularFireList<any>;

  selectedPermiso: Permiso = new Permiso();

  constructor( private firebase:AngularFireDatabase) { }

  getPermisos(){
    return this.permisoList = this.firebase.list('permisos');
  }

  insertPermiso(
  nombre:string,dui:string,telefono:string,cargo:string,motivo:string,comentario:string,fechaPermiso:string,desde:string,hasta:string){
    this.permisoList.push({
      nombre: nombre,
      dui: dui,
      telefono: telefono,
      cargo: cargo,
      motivo: motivo,
      comentario:comentario,
      fechaPermiso: fechaPermiso,
      desde: desde,
      hasta: hasta,
      //estado: estado,
    });
  }

  updatePermiso(permiso:Permiso){
    this.permisoList.update(permiso.$key,{
      nombre: permiso.nombre,
      dui: permiso.dui,
      telefono: permiso.telefono,
      cargo: permiso.cargo,
      motivo: permiso.motivo,
      fechaPermiso: permiso.fechaPermiso,
      desde: permiso.desde,
      hasta: permiso.hasta,
      //estado: permiso.estado
    });
  }

  deletePermiso($key:string){
    this.permisoList.remove($key);
  }
}

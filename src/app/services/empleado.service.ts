import { Injectable } from '@angular/core';

//Firebase
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';

//Model
import { Empleado } from '../models/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  empleadoList:AngularFireList<any>;

  selectedEmpleado: Empleado = new Empleado();

  constructor( private firebase:AngularFireDatabase) { }

  getEmpleados(){
    return this.empleadoList = this.firebase.list('empleados');
  }

  insertEmpleado(nombre:string,email:string,direccion:string,fechaNacimiento:string,
    ingresoEmpresa:string,cargo:string,horas:number,dui:string,nit:string,telefono:string,afp:string,isss:string,contratacion:string,sueldo:number){
    this.empleadoList.push({
      Nombre: nombre,
      Email: email,
      Direccion: direccion,
      FechaNacimiento: fechaNacimiento,
      IngresoEmpresa: ingresoEmpresa,
      Cargo: cargo,
      Horas: horas,
      DUI: dui,
      NIT: nit,
      Telefono: telefono,
      AFP: afp,
      ISSS: isss,
      Contratacion: contratacion,
      Sueldo: sueldo,
    });
  }

  updateEmpleado(empleado:Empleado){
    this.empleadoList.update(empleado.$key,{
      Nombre: empleado.nombre,
      Email: empleado.email,
      Direccion: empleado.direccion,
      FechaNacimiento: empleado.fechaNacimiento,
      IngresoEmpresa: empleado.ingresoEmpresa,
      Cargo: empleado.cargo,
      Horas: empleado.horas,
      DUI: empleado.dui,
      NIT: empleado.nit,
      Telefono: empleado.telefono,
      AFP: empleado.afp,
      ISSS: empleado.isss,
      Contratacion: empleado.contratacion,
      Sueldo: empleado.sueldo
    });
  }

  deleteEmpleado($key:string){
    this.empleadoList.remove($key);
  }
}

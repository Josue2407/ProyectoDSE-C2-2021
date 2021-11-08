import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
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
nombre:string;
email:string;
direccion:String;
fechaNacimiento:string;
ingresoEmpresa:string;
cargo:string;
horas:number;
dui:string;
nit:string;
telefono:string;
afp:string;
isss:string;
contratacion:string;
sueldo:number;

  constructor( private firebase:AngularFireDatabase) { }

  getEmpleados(){
    return this.empleadoList = this.firebase.list('empleados');
  }

  insertEmpleado(nombre:string,email:string,direccion:string,fechaNacimiento:string,
    ingresoEmpresa:string,cargo:string,horas:number,dui:string,nit:string,telefono:string,afp:string,isss:string,contratacion:string,sueldo:number){
    this.empleadoList.push({
      nombre: nombre,
      email: email,
      direccion: direccion,
      fechaNacimiento: fechaNacimiento,
      ingresoEmpresa: ingresoEmpresa,
      cargo: cargo,
      horas: horas,
      dui: dui,
      nit: nit,
      telefono: telefono,
      afp: afp,
      isss: isss,
      contratacion: contratacion,
      sueldo: sueldo,
    });
  }

  updateEmpleado(empleado:Empleado){
    console.log(empleado.nombre);
    this.empleadoList.update(empleado.$key,{
      nombre: empleado.nombre,
      email: empleado.email,
      direccion: empleado.direccion,
      fechaNacimiento: empleado.fechaNacimiento,
      ingresoEmpresa: empleado.ingresoEmpresa,
      cargo: empleado.cargo,
      horas: empleado.horas,
      dui: empleado.dui,
      nit: empleado.nit,
      telefono: empleado.telefono,
      afp: empleado.afp,
      isss: empleado.isss,
      contratacion: empleado.contratacion,
      sueldo: empleado.sueldo
    });
  }

  deleteEmpleado($key:string){
    this.empleadoList.remove($key);
  }
}

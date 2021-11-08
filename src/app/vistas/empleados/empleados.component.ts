import { Component,OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
//Service
import { EmpleadoService } from '../../services/empleado.service';
//Model
import {Empleado} from '../../models/empleado';
import { element } from 'protractor';
import { PropertyRead } from '@angular/compiler';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.scss']
})
export class EmpleadosComponent implements OnInit{
  empleadoList:Empleado[];
  $key:string;
  nombre:string;
    email:string;
    direccion:string;
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
  constructor(
    public empleadoService: EmpleadoService
  ) {}

  ngOnInit(): void {
    this.empleadoService.getEmpleados().snapshotChanges().subscribe(item =>{
      this.empleadoList = [];
      item.forEach(element =>{
        let x = element.payload.toJSON();
        x["$key"]= element.key;
        this.empleadoList.push(x as Empleado);
      });
      console.log(this.empleadoList);
    });
  }

  resetForm() {
    this.nombre = '';
    this.email = '';
    this.direccion='';
    this.fechaNacimiento='';
    this.ingresoEmpresa='';
    this.cargo='';
    this.horas= null;
    this.dui='';
    this.nit='';
    this.telefono='';
    this.afp='';
    this.isss='';
    this.contratacion='';
    this.sueldo= null;
  }

  onSubmit(){
    this.empleadoService.insertEmpleado(this.nombre,this.email,this.direccion,this.fechaNacimiento,
      this.ingresoEmpresa,this.cargo,this.horas,this.dui,this.nit,this.telefono,this.afp,this.isss,this.contratacion,this.sueldo);
    Swal.fire({
      icon: 'success',
      title: 'Empleado Ingresado',
      showConfirmButton: false,
      timer: 1500
    })
      this.resetForm();
  }

  onEdit(Empleado:Empleado){
    this.empleadoService.selectedEmpleado = Object.assign({},Empleado);
  }
  
  onUpdate(){
    console.log(this.empleadoService.selectedEmpleado);
  
    this.empleadoService.updateEmpleado( this.empleadoService.selectedEmpleado);
    Swal.fire({
          icon: 'success',
          title: 'Empleado Modificado',
          showConfirmButton: false,
          timer: 1500
          })
  this.resetForm();
  }

  onDelete($key: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir los cambios",
      icon: 'warning',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
    }).then((result) => {
      if (result.isConfirmed) {
        this.empleadoService.deleteEmpleado($key);
        Swal.fire(
          'Eliminado!',
          'Empleado ha sido eliminado.',
          'success'
        )
      }
    })
  }


}

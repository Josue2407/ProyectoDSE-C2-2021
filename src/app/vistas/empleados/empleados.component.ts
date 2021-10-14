import { Component,OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
//Service
import { EmpleadoService } from '../../services/empleado.service';
//Model
import {Empleado} from '../../models/empleado';
import { element } from 'protractor';


@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.scss']
})
export class EmpleadosComponent implements OnInit{
  empleadoList:Empleado[];
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
    this.resetForm();
  }
}

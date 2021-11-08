import { Component, OnInit } from '@angular/core';
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
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
empleadoList:Empleado[];

  constructor(public empleadoService: EmpleadoService) { }

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

}

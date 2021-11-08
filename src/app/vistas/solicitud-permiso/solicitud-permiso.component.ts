import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
//Service
import { PermisoService } from '../../services/permiso.service';
//Model
import { Permiso } from '../../models/permiso';
import { element } from 'protractor';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-solicitud-permiso',
  templateUrl: './solicitud-permiso.component.html',
  styleUrls: ['./solicitud-permiso.component.scss']
})
export class SolicitudPermisoComponent implements OnInit {
  permisoList:Permiso[];
  nombre:string;
    dui:string;
    telefono:string;
    cargo:string;
    motivo:string;
    fechaPermiso:string;
    desde:string;
    hasta:string;
    //estado:string; 

  constructor(
    public permisoService: PermisoService 
  ) { }

  ngOnInit(): void {
    this.permisoService.getPermisos().snapshotChanges().subscribe(item =>{
      this.permisoList = [];
      item.forEach(element =>{
        let x = element.payload.toJSON();
        x["$key"]= element.key;
        this.permisoList.push(x as Permiso);
      });
      console.log(this.permisoList);
    });
  }

  resetForm() {
    this.nombre = '';
    this.dui = '';
    this.telefono='';
    this.cargo='';
    this.motivo='';
    this.fechaPermiso='';
    this.desde='';
    this.hasta='';
}

onSubmit(){ //this.estado="Pendiente";
    this.permisoService.insertPermiso(this.nombre,this.dui,this.telefono,this.cargo,
      this.motivo,'',this.fechaPermiso,this.desde,this.hasta);
    this.resetForm();
  }
/*
onSubmit(empleadoForm: NgForm) {
    if (empleadoForm.value.$id == null) {
      this.empleadoService.insertEmployee(empleadoForm.value);
    }
    else {
      this.empleadoService.updateEmployee(empleadoForm.value);
    }
    this.resetForm(empleadoForm);
  }
*/
  
  onEdit(permiso: Permiso) {
    this.permisoService.selectedPermiso = Object.assign({}, permiso);
  }

  onUpdate(permiso: Permiso){
  this.permisoService.updatePermiso(this.permisoService.selectedPermiso);

  }

  /* 
   Recibe la llave '$key' para eliminar el registro, invocando el metodo 'deleteProduct' del servicio de firebase
   ademas muestra un 'warning' con toastr
*/

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
          this.permisoService.deletePermiso($key);
          Swal.fire(
            'Rechazada!',
            'Permiso ha sido rechazado.',
            'success'
          )
        }
      })
    }

  onYes($key: string) {
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
          //this.permisoService.deletePermiso($key);
          Swal.fire(
            'Aceptado!',
            'Permiso ha sido aceptado.',
            'success'
          )
        }
      })
  }

 /* descargar(){
  const doc = new jsPDF();

doc.text("Reporte de permisos", 10, 10);

doc.save("Reporte permisos.pdf");
  }*/
}




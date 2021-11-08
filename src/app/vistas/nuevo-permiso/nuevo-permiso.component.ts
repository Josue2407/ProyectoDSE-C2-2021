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

//pdf
import pdfMake from 'pdfmake/build/pdfmake'; 
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-nuevo-permiso',
  templateUrl: './nuevo-permiso.component.html',
  styleUrls: ['./nuevo-permiso.component.scss']
})
export class NuevoPermisoComponent implements OnInit {
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

    createPdf (){
      //const pdfDefinition: any = {content:[{text:'hola'}]}
      const pdfDefinition: any = {content:[{
        //text:'hola'
        
      table: {
          body: [  
            ['Nombre', 'DUI', 'Telefono', 'Cargo', 'Motivo', 'Fecha', 'Desde', 'Hasta'],  
            ...this.permisoList.map(p => ([p.nombre,p.dui,p.telefono,p.cargo,p.motivo,p.fechaPermiso,p.desde,p.hasta]))  
        ] 
        }

      }]}
      const pdf = pdfMake.createPdf (pdfDefinition);
      pdf.open();
    }
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
      this.motivo,this.fechaPermiso,this.desde,this.hasta);Swal.fire({
        icon: 'success',
        title: 'Solicitud Ingresada',
        showConfirmButton: false,
        timer: 1500
      })
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
  Swal.fire({
    icon: 'success',
    title: 'Permiso Modificado',
    showConfirmButton: false,
    timer: 1500
    })
this.resetForm();

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
          'Eliminado!',
          'Permiso ha sido eliminado.',
          'success'
        )
      }
    })
  }
}



import { Component, OnInit } from '@angular/core';
import { Marcacion } from '../../models/marcacion';
import { MarcacionService } from '../../services/marcacion.service';
 import { PermisoService } from '../../services/permiso.service';
import { EmpleadoService } from '../../services/empleado.service';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Permiso } from '../../models/permiso';
import { Empleado } from '../../models/empleado';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-horas',
  templateUrl: './horas.component.html',
  styleUrls: ['./horas.component.scss']
})
export class HorasComponent implements OnInit {

  marcacioneList: Marcacion[];
  empleadosList: Empleado[];
  permisosList: Permiso[];
  marcacionSelected:Marcacion;
  empleadoSelected:Empleado;
  totalMinutes:number;
  dui:'';
  nombre:string;
  fechaInicio: Date;
  fechaFin:Date;
  fechaPermiso:Date;
  comentario:'';
  motivo:'';
  descuentos:string;
  salarioxHora:string;
  salario:number;
  horasDescontadas:number
  constructor(
    public marcacionesService: MarcacionService,
    public permisosService: PermisoService,
    public empleadoService:EmpleadoService
  ) {}

  ngOnInit(): void {
    
  }
  SetDataPermiso(value:Marcacion):void{
    this.marcacionSelected = value;
    console.log(this.marcacionSelected)
  }
  search(): void {
    if(this.dui == '' || this.dui == undefined)
    {
      Swal.fire({
        icon: 'error',
        title: 'Ingrese un número de DUI',
        showConfirmButton: false,
        timer: 1500
      })
      return;
    }
    if(this.fechaInicio == undefined)
    {
      Swal.fire({
        icon: 'error',
        title: 'Seleccione una fecha de inicio',
        showConfirmButton: false,
        timer: 1500
      })
      return;
    }
    if(this.fechaFin == undefined)
    {
      Swal.fire({
        icon: 'error',
        title: 'Seleccione una fecha final',
        showConfirmButton: false,
        timer: 1500
      })
      return;
    }
    this.marcacionesService.getMarcaciones().snapshotChanges().subscribe(item =>{
      this.marcacioneList = [];
      this.totalMinutes = 0;
      item.forEach(element =>{
        let x = element.payload.toJSON();
        x["$key"]= element.key;
        if ((x as Marcacion).dui == this.dui && (x as Marcacion).fecha >= this.fechaInicio && (x as Marcacion).fecha <= this.fechaFin)
          this.marcacioneList.push(x as Marcacion);
          
        console.log(this.marcacioneList)
      });

      if (this.marcacioneList.length == 0) {
        alert("No se econtraron registro");
        return;
      }
      console.log(this.fechaInicio)
      this.totalMinutes = 0;
      this.marcacioneList.forEach(x => this.totalMinutes += x.minutosTardes);
    });

    this.getPermisos();
    this.getEmpleado();
  }
  resetForm() : void{
    this.fechaPermiso = undefined;
    this.motivo = '';
    this.comentario = '';
    this.marcacionSelected = new Marcacion();
  }

  onSubmit(){
    if(this.motivo== undefined || this.motivo== '')
    {
      alert('Seleccione un motivo por favor.')
      return;
    }

    if(this.fechaPermiso == undefined)
    {
      alert("Selecciona una fecha");
      return;
    }

    this.marcacionesService.updateMarcacion(this.marcacionSelected);
     this.permisosService.insertPermiso(
      this.nombre, this.dui, '',this.empleadoSelected.cargo,this.motivo, this.comentario,this.fechaPermiso.toString(),
      '',''
     );
     this.search();
   this.resetForm();
  }

  getPermisos() : void{
    this.permisosService.getPermisos().snapshotChanges().subscribe(item =>{
      this.permisosList = [];
      item.forEach(element =>{
        let x = element.payload.toJSON();
        x["$key"]= element.key;
        if ((x as Permiso).dui == this.dui)
          this.permisosList.push(x as Permiso);
          
    
      });
    });
    }
  getEmpleado() : void{
    this.empleadoService.getEmpleados().snapshotChanges().subscribe(item =>{
      item.forEach(element =>{
        let x = element.payload.toJSON();
        x["$key"]= element.key;
        console.log(element)
        alert((x as Empleado).dui)
          if(this.dui == (x as Empleado).dui)
          {
            this.empleadoSelected = (x as Empleado);  
          
            this.nombre = this.empleadoSelected.nombre;
            //Calcular descuentos
            this.salario = this.empleadoSelected.sueldo;
             this.salarioxHora = ((this.empleadoSelected.sueldo / 4)/this.empleadoSelected.horas).toFixed(2)
            //por cada 7 minutos se descuenta media hora
            this.horasDescontadas =Math.round((this.totalMinutes / 7))
            this.descuentos = (this.horasDescontadas * parseFloat(this.salarioxHora)).toFixed(2);
          }
            
      });
    });
  }
}

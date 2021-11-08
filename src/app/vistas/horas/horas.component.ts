import { Component, OnInit } from '@angular/core';
import { Marcacion } from '../../models/marcacion';
import { MarcacionService } from '../../services/marcacion.service';
// import { PermisoService } from '../../services/permiso.service';
import { EmpleadoService } from '../../services/empleado.service';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
//import { Permiso } from '../../models/permiso';
import { Empleado } from '../../models/empleado';

@Component({
  selector: 'app-horas',
  templateUrl: './horas.component.html',
  styleUrls: ['./horas.component.scss']
})
export class HorasComponent implements OnInit {

  marcacioneList: Marcacion[];
  empleadosList: Empleado[];
  //permisosList: Permiso[];
  marcacionSelected:Marcacion;
  empleadoSelected:Empleado;
  totalMinutes:number;
  dui:'';
  fechaInicio: Date;
  fechaFin:Date;
  fechaPermiso:Date;
  comentario:'';
  motivo:'';
  constructor(
    public marcacionesService: MarcacionService,
    //public permisosService: PermisoService,
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
      alert("Ingrese un numero de DUI");
      return;
    }
    if(this.fechaInicio == undefined)
    {
      alert("Selecciona una fecha de inicio");
      return;
    }
    if(this.fechaFin == undefined)
    {
      alert("Selecciona una fecha final");
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
      console.log(this.totalMinutes)
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
   this.resetForm();
  }

  getPermisos() : void{
    // this.permisosService.getPermisos().snapshotChanges().subscribe(item =>{
    //   this.permisosList = [];
    //   item.forEach(element =>{
    //     let x = element.payload.toJSON();
    //     x["$key"]= element.key;
    //       this.permisosList.push(x as Permiso);
          
    //     console.log(this.permisosList)
    //   });
    // });
    }
  getEmpleado() : void{
    this.empleadoService.getEmpleados().snapshotChanges().subscribe(item =>{
      item.forEach(element =>{
        let x = element.payload.toJSON();
        x["$key"]= element.key;
          if(this.dui == (x as Empleado).dui)
          this.empleadoSelected = (x as Empleado);
          
       
      });
    });
  }
}

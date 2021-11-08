import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
//Service
import { EmpleadoService } from '../../services/empleado.service';
//Model
import { Empleado } from '../../models/empleado';
import { element } from 'protractor';
import { PropertyRead } from '@angular/compiler';
import Swal from 'sweetalert2';

//pdf
import pdfMake from 'pdfmake/build/pdfmake'; 
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-nomina',
  templateUrl: './nomina.component.html',
  styleUrls: ['./nomina.component.scss']
})
export class NominaComponent implements OnInit {
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

    /*createPdf (){
      //const pdfDefinition: any = {content:[{text:'hola'}]}
      const pdfDefinition: any = {content:[{

      }]}
      const pdf = pdfMake.createPdf (pdfDefinition);
      pdf.open();
    }*/

    createPdf (){
      //const pdfDefinition: any = {content:[{text:'hola'}]}
      const pdfDefinition: any = {content:[{
        //text:'hola'
        
      table: {
          body: [  
            ['Nombre', 'DUI', 'Cargo', 'Horas trabajadas', 'AFP', 'ISSS', 'Sueldo'],  
            ...this.empleadoList.map(p => ([p.nombre, p.dui, p.cargo,p.horas,p.afp,p.isss,p.sueldo]))  
        ] 
        }

      }]}
      const pdf = pdfMake.createPdf (pdfDefinition);
      pdf.open();
    }

/*    createPdf2 (){
      //const pdfDefinition: any = {content:[{text:'hola'}]}
      const pdfDefinition: any = {content:[{
        //text:'hola'
        
      table: {
          body: [  
            ['Nombre', 'DUI', 'Cargo', 'Horas trabajadas', 'AFP', 'ISSS', 'Sueldo'],  
            ...this.empleadoList.map(p => ([p.nombre, p.dui, p.cargo,p.horas,p.afp,p.isss,p.sueldo]))  
        ] 
        }

      }]}
      const pdf = pdfMake.createPdf (pdfDefinition);
      pdf.open();
    }
*/
  /* generatePDF(action = 'open') {    
        
      let docDefinition = {      
        content :[{
          text: 'Order Details',  
          style: 'sectionHeader'
        },
        {
          table: {  
            headerRows: 1,  
            widths: ['*', 'auto', 'auto', 'auto'],  
            body: [  
                ['Nombre', 'DUI', 'Cargo', 'Horas trabajadas', 'AFP', 'ISSS', 'Sueldo'],  
                ...this.empleadoList.map(p => ([p.nombre, p.dui, p.cargo,p.horas,p.afp,p.isss,p.sueldo]))  
            ] 
        }   
        }
      ],
      }
    }*/
  
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


}

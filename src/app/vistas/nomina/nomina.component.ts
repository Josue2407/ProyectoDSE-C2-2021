import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
//Service
import { EmpleadoService } from '../../services/empleado.service';
//Model
import { Empleado } from '../../models/empleado';
import { element } from 'protractor';


@Component({
  selector: 'app-nomina',
  templateUrl: './nomina.component.html',
  styleUrls: ['./nomina.component.scss']
})
export class NominaComponent implements OnInit {

  
  constructor() {}

  ngOnInit(): void {
    
   }
}
import { Component, OnInit } from '@angular/core';
import { Marcacion } from '../../models/marcacion';
import { MarcacionService } from '../../services/marcacion.service';

@Component({
  selector: 'app-horas',
  templateUrl: './horas.component.html',
  styleUrls: ['./horas.component.scss']
})
export class HorasComponent implements OnInit {

  marcacioneList: Marcacion[]
  totalMinutes:number
  constructor(
    public marcacionesService: MarcacionService
  ) {}

  ngOnInit(): void {
    this.marcacionesService.getMarcaciones().snapshotChanges().subscribe(item =>{
      this.marcacioneList = [];
      item.forEach(element =>{
        let x = element.payload.toJSON();
        x["$key"]= element.key;
        this.marcacioneList.push(x as Marcacion);
      });
      
      this.totalMinutes = 0;
      this.marcacioneList.forEach(x => this.totalMinutes += x.minutosTardes);
      console.log(this.totalMinutes)
    });
  }

}

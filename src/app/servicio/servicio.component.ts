import { Component, OnInit } from '@angular/core';
import { Api } from '../services/api.service';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css']
})
export class ServicioComponent implements OnInit{
  data: any[] = [];

  constructor(private api: Api){}
  ngOnInit(): void {
    this.llenardata();

  }

  llenardata(){
    this.api.getData().subscribe(data => {
      this.data = data;
    });
  };
}

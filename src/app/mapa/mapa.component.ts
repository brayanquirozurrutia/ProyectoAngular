import { Component, OnInit } from '@angular/core';
import mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit{
  // Coordenadas
  latitud = -33.407532721609186;
  longitud = -70.55260815362492;

  ngOnInit() {
    this.initMap();
  }

  initMap() {
    // Clave de acceso
    mapboxgl.accessToken = 'pk.eyJ1IjoiYnJheWFucXVpcm96IiwiYSI6ImNsa2cybjJjczFsaHkzY3Bocjdubjd4YTUifQ.u1r-W8VVx2NDuZBQdWcIsQ';

    // Creamos mapa
    const map = new mapboxgl.Map({
      container: 'mapa',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.longitud, this.latitud],
      zoom: 15
    });

    // Agregar marcador
    new mapboxgl.Marker()
      .setLngLat([this.longitud, this.latitud])
      .addTo(map);
  };
}

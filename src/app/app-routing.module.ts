import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importamos las rutas nuevas
import { ClientesComponent } from './clientes/clientes.component';
import { ProductosComponent } from './productos/productos.component';
import { CarritoComponent } from './carrito/carrito.component';
import { MapaComponent } from './mapa/mapa.component';
import { ContactoComponent } from './contacto/contacto.component';
import { ServicioComponent } from './servicio/servicio.component';

// Añadimos la ruta
const routes: Routes = [
  {
    path:'ClientesFelices',
    component:ClientesComponent
  },
  {
    path:'ListadoProductos',
    component:ProductosComponent
  },
  {
    path:'CarritoCompra',
    component:CarritoComponent
  },
  {
    path:'MapaTienda',
    component:MapaComponent
  },
  {
    path:'ContactoTienda',
    component:ContactoComponent
  },
  {
    path:'Servicio',
    component:ServicioComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
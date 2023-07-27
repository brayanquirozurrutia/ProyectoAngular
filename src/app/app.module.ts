import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Libreria de formulario
import { FormsModule} from '@angular/forms';
// Componente de ClientesFelices
import { ClientesComponent } from './clientes/clientes.component';
// Importamos ListadoProductos
import { ProductosComponent } from './productos/productos.component';
// Importamos el módulo para compartir variables entre componentes
import { SharedService } from './shared/shared.service';
// Importamos CarritoCompra
import { CarritoComponent } from './carrito/carrito.component';
// Importamos MapaTienda
import { MapaComponent } from './mapa/mapa.component';
// Importamos ContactoTienda
import { ContactoComponent } from './contacto/contacto.component';
// Importamos Servicio
import { ServicioComponent } from './servicio/servicio.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    ProductosComponent,
    CarritoComponent,
    MapaComponent,
    ContactoComponent,
    ServicioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, ChangeDetectorRef } from '@angular/core';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {
  constructor(public sharedService: SharedService, private changeDetectorRef: ChangeDetectorRef) { };

  // Detectamos si hay artículos comprados
  hayCompra(){
    return this.sharedService.articulos_comprados.length > 1;
  };

  // Método para eliminar un artículo del listado
  borrar(codigo: number) {
    for (let index = 0; index < this.sharedService.articulos_comprados.length; index++) {
      if (this.sharedService.articulos_comprados[index].codigo == codigo) {
        // Recorremos la lista de productos
        for (let indice = 0; indice < this.sharedService.productos.length; indice++)
          // Buscamos la coincidencia
          if (this.sharedService.productos[indice].codigo == codigo) {
            // Devolvemos el stock del producto al eliminar el artículo
            this.sharedService.productos[indice].cantidad += this.sharedService.articulos_comprados[index].cantidad;
            // Restamos cantidad al carrito
            this.sharedService.disminuirCarrito(this.sharedService.articulos_comprados[index].cantidad);
            // Eliminamos
            this.sharedService.articulos_comprados.splice(index,1);
            // Forzamos a Angular a detectar el cambio de las cantidades de elementos disponibles
            this.changeDetectorRef.detectChanges();
            return;
          };
      };
    };
  };

  // Método para seleccionar un artículo
  seleccionar(articulo:{codigo:number;nombre:string;cantidad:number;precio:number;total:number}){
    this.sharedService.articulo.codigo = articulo.codigo;
    this.sharedService.articulo.nombre = articulo.nombre;
    this.sharedService.articulo.cantidad = articulo.cantidad;
    this.sharedService.articulo.precio = articulo.precio;
    this.sharedService.articulo.total = articulo.total;
    // Forzamos a Angular a detectar el cambio de las cantidades de elementos disponibles
    this.changeDetectorRef.detectChanges();
  };

  // VER TEMA DEL FOR PARA VER SI EL ID QUE QUEDA POR DEFECTO ESTÁ DENTRO DEL LISTADO PARA AGREGAR Y QUITAR


  // Método para modificar un artículo
  agregar(){
    // Verificamos que se haya seleccionado un artículo
    if (this.sharedService.articulo.codigo == 0) {
      alert("ERROR: Primero debe seleccionar un artículo de su listado para poder modificar la cantidad. Por favor, intente nuevamente.")
      return;
    };
    // Verificamos que haya stock
    // Recorremos el listado de artículos seleccionados
    for (let index = 0; index < this.sharedService.articulos_comprados.length; index++)
      if (this.sharedService.articulos_comprados[index].codigo == this.sharedService.articulo.codigo) {
        // Recorremos la lista de productos
        for (let indice = 0; indice < this.sharedService.productos.length; indice++)
          // Verificamos el artículo dentro de los productos
          if (this.sharedService.productos[indice].codigo == this.sharedService.articulos_comprados[index].codigo) {
            // Verificamos el stock
            if (this.sharedService.productos[indice].cantidad < this.sharedService.articulo.cantidad) {
              alert("¡Oh, oh! Este producto se ha quedado sin stock :( Pero pronto te avisaremos cuando esté nuevamente disponible.");
              return;
            } else {
              // Aumentamos la cantidad y el total del artículo dentro del listado
              this.sharedService.articulos_comprados[index].cantidad += this.sharedService.articulo.cantidad;
              this.sharedService.articulos_comprados[index].total += this.sharedService.articulo.cantidad * this.sharedService.articulos_comprados[index].precio;
              // Disminuimos la cantidad
              this.sharedService.productos[indice].cantidad -= this.sharedService.articulo.cantidad;
              // Sumamos cantidad al carrito
              this.sharedService.aumentarCarrito(this.sharedService.articulo.cantidad);
              // Forzamos a Angular a detectar el cambio de las cantidades de elementos disponibles
              this.changeDetectorRef.detectChanges();
              return;
            };
          };
      };
    alert(`ERROR: El el código ${this.sharedService.articulo.codigo} no está en sus artículos. Por favor, seleccione uno de sus lista e intente nuevamente.`);
    return;
  };

  quitar(){
    // Verificamos que se haya seleccionado un artículo
    if (this.sharedService.articulo.codigo == 0) {
      alert("ERROR: Primero debe seleccionar un artículo de su listado para poder modificar la cantidad. Por favor, intente nuevamente.")
      return;
    };
    // Recorremos el listado de artículos seleccionados
    for (let index = 0; index < this.sharedService.articulos_comprados.length; index++)
      if (this.sharedService.articulos_comprados[index].codigo == this.sharedService.articulo.codigo) {
        // Recorremos la lista de productos
        for (let indice = 0; indice < this.sharedService.productos.length; indice++)
          // Verificamos el artículo dentro de los productos
          if (this.sharedService.productos[indice].codigo == this.sharedService.articulos_comprados[index].codigo) {
            // Verificamos la cantidad a quitar
            if (this.sharedService.articulo.cantidad > this.sharedService.articulos_comprados[index].cantidad) {
              alert("ERROR: Debe ingresar una cantidad a quitar igual o inferior a la ya seleccionada. Por favor, intente nuevamente.");
              return;
            } else {
              // Disminuimos la cantidad y el total del artículo dentro del listado
              this.sharedService.articulos_comprados[index].cantidad -= this.sharedService.articulo.cantidad;
              this.sharedService.articulos_comprados[index].total -= this.sharedService.articulo.cantidad * this.sharedService.articulos_comprados[index].precio;
              // Aumentamos la cantidad
              this.sharedService.productos[indice].cantidad += this.sharedService.articulo.cantidad;
              // Verificamos si se ha quitado toda la cantidad
              if (this.sharedService.articulos_comprados[index].cantidad == 0) {
                this.borrar(this.sharedService.articulos_comprados[index].codigo)
              };
              // Actualizamos carrito
              this.sharedService.disminuirCarrito(this.sharedService.articulo.cantidad);
              // Forzamos a Angular a detectar el cambio de las cantidades de elementos disponibles
              this.changeDetectorRef.detectChanges();
              return;
            };
          };
      };
    alert(`ERROR: El el código ${this.sharedService.articulo.codigo} no está en sus artículos. Por favor, seleccione uno de sus lista e intente nuevamente.`);
    return;
  };
};

import { Injectable } from '@angular/core';
// import { Subject } from 'rxjs';

@Injectable()
export class SharedService {

  // // Creamos un Subject que actuará como nuestro Observable para emitir cambios
  // private cambiosSubject: Subject<any> = new Subject<any>();

  // // Exponemos el observable público para que los componentes puedan suscribirse
  // cambios$ = this.cambiosSubject.asObservable();

  // Exportamos las variables

  // Productos de la tienda
  productos = [
    {
      codigo:1,
      nombre:"Album BTS BE",
      cantidad:5,
      precio:24000
    },
    {
      codigo:2,
      nombre:"PC BTS",
      cantidad:2,
      precio:7000
    },
    {
      codigo:3,
      nombre:"Album NewJeans NewJEans EP",
      cantidad:3,
      precio:20000
    },
    {
      codigo:4,
      nombre:"PC NewJeans",
      cantidad:10,
      precio:7000
    },
    {
      codigo:5,
      nombre:"Album BTS Love Yourself Answer",
      cantidad:1,
      precio:20000
    },
    {
      codigo:6,
      nombre:"Lámpara Totoro",
      cantidad:3,
      precio:18000
    },
    {
      codigo:7,
      nombre:'Map of the Soul: Persona',
      cantidad:6,
      precio:20000
    }
  ];

  // Producto (usado para el CRUD de Productos)
  producto = {
    codigo:0,
    nombre:'',
    cantidad:0,
    precio:0
  };

  // Listado con los artículos comprados
  articulos_comprados = [{
    codigo:0,
    nombre:'',
    cantidad:0,
    precio:0,
    total:0
  }];

  // Artículo (usado para el CRUD de Carrito)
  articulo = {
    codigo:0,
    nombre:'',
    cantidad:0,
    precio:0,
    total:0
  };

  // Variable cantidad del carrito
  cantidad_carrito = 0;

  aumentarCarrito(cantidad:number){
    this.cantidad_carrito += cantidad;
  };

  disminuirCarrito(cantidad:number){
    this.cantidad_carrito -= cantidad;
  };

  // Método para añadir un artículo seleccionado al listado de compra
  agregarCarrito(indice_producto: any, cantidad: any){
    // Recorremos los elementos
    for (let index = 0; index < this.articulos_comprados.length; index++){
      // Si repito un artículo, sumo la cantidad
      if (this.articulos_comprados[index].codigo == this.productos[indice_producto].codigo) {
        this.articulos_comprados[index].cantidad += cantidad;
        return
      };
    };
    // Si no se repite, añado el artículo al listado para poder verlo
    this.articulos_comprados.push(
      {
        codigo:this.productos[indice_producto].codigo,
        nombre:this.productos[indice_producto].nombre,
        cantidad:cantidad,
        precio:this.productos[indice_producto].precio,
        total:cantidad*this.productos[indice_producto].precio
      }
    );
  };




};
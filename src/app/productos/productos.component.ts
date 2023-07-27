import { Component, ChangeDetectorRef } from '@angular/core';
import { SharedService } from '../shared/shared.service';
SharedService

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})

export class ProductosComponent {
  constructor(public sharedService: SharedService, private changeDetectorRef: ChangeDetectorRef) { };

  // Detectamos si quedan productos disponibles
  hayProductos(){
    return this.sharedService.productos.length > 0;
  };

  // Método para eliminar un producto del listado
  borrar(codigo: number) {
    for (let index = 0; index < this.sharedService.productos.length; index++) {
      if (this.sharedService.productos[index].codigo == codigo) {
        this.sharedService.productos.splice(index,1);
        // Forzamos a Angular a detectar el cambio de las cantidades de elementos disponibles
        this.changeDetectorRef.detectChanges();
        return;
      };
    };
  };

  // Método para seleccionar un producto
  seleccionar(producto:{codigo:number;nombre:string;cantidad:number;precio:number}){
    this.sharedService.producto.codigo = producto.codigo;
    this.sharedService.producto.nombre = producto.nombre;
    this.sharedService.producto.cantidad = producto.cantidad;
    this.sharedService.producto.precio = producto.precio;
    // Forzamos a Angular a detectar el cambio de las cantidades de elementos disponibles
    this.changeDetectorRef.detectChanges();
  };

  // Método para agregar un producto
  agregar(){
    // Verificamos que no se ingrese un ID menor a 1
    if (this.sharedService.producto.codigo < 1) {
      alert("ERROR: Debe ingresar un ID mayor o igual a 1. Por favor, intente nuevamente.");
      return;
    };
    // Verificamos que se haya ingresado un nombre del producto
    if (this.sharedService.producto.nombre.length == 0) {
      alert(`ERROR: Debe ingresar un nombre para el producto. Por favor, intente nuevamente.`);
      return;
      // Verificamos cantidad del producto
    } else if (this.sharedService.producto.cantidad <= 0){
      alert(`ERROR: La cantidad del producto no puede ser menor a 1. Por favor, intente nuevamente.`);
      return;
      // Verificamos precio del producto
    } else if (this.sharedService.producto.precio <= 0){
      alert(`ERROR: El precio del producto no puede ser menor o igual a 0. Por favor, intente nuevamente.`);
      return;
    };
    // Valida que no se repita el código
    for (let index = 0; index < this.sharedService.productos.length; index++) 
      if (this.sharedService.productos[index].codigo == this.sharedService.producto.codigo) {
        alert(`ERROR: El código ${this.sharedService.producto.codigo} ya está registrado. Por favor, intente con otro código.`);
        return;
      };
      // Agregamos datos
      this.sharedService.productos.push({codigo:this.sharedService.producto.codigo, nombre:this.sharedService.producto.nombre, cantidad:this.sharedService.producto.cantidad, precio:this.sharedService.producto.precio});
      // Limpiar campos
      this.sharedService.producto.codigo = 0;
      this.sharedService.producto.nombre = '';
      this.sharedService.producto.cantidad = 0;
      this.sharedService.producto.precio = 0;
      // Forzamos a Angular a detectar el cambio de las cantidades de elementos disponibles
      this.changeDetectorRef.detectChanges();
      return;
  };
  // Método para modificar un producto
  modificar(){
    // Verificamos que no se ingrese un ID menor a 1
    if (this.sharedService.producto.codigo < 1) {
      alert("ERROR: Debe ingresar un ID mayor o igual a 1. Por favor, intente nuevamente.");
      return;
    };
    // Verificamos que el código exista
    for (let index = 0; index < this.sharedService.productos.length; index++)
    if (this.sharedService.productos[index].codigo == this.sharedService.producto.codigo) {
      // Verificamos que se haya ingresado un nombre del producto
      if (this.sharedService.producto.nombre.length == 0) {
        alert(`ERROR: Debe ingresar un nombre para el producto. Por favor, intente nuevamente.`);
        return;
      };
      // Verificamos cantidad del producto
      if (this.sharedService.producto.cantidad <= 0) {
        alert(`ERROR: La cantidad del producto no puede ser menor a 1. Por favor, intente nuevamente.`);
        return;
      };
      // Verificamos precio del producto
      if (this.sharedService.producto.precio <= 0) {
        alert(`ERROR: El precio del producto no puede ser menor o igual a 0. Por favor, intente nuevamente.`);
        return;
      };
      this.sharedService.productos[index].codigo = this.sharedService.producto.codigo;
      this.sharedService.productos[index].nombre = this.sharedService.producto.nombre;
      this.sharedService.productos[index].cantidad = this.sharedService.producto.cantidad;
      this.sharedService.productos[index].precio = this.sharedService.producto.precio;
      // Forzamos a Angular a detectar el cambio de las cantidades de elementos disponibles
      this.changeDetectorRef.detectChanges();
      return
    };
    alert(`ERROR: El código ${this.sharedService.producto.codigo} no está registrado. Por favor, intente con otro código.`);
  };

};

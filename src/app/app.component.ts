import { Component } from '@angular/core';
import { SharedService } from './shared/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'jelly_angular';

  constructor(public sharedService: SharedService) { }
  
  // declaramos el id del producto
  id_producto = '';
  // Declaramos el nombre del producto
  nombre_producto = '';
  // Declaramos el total de la compra
  total_compra = 0;
  // Declaramos la variable costo de envio
  costo_envio = 0;
  // Declaramos la variable cantidad seleccionada
  cantidad = 0;
  
  // --------------------------------- DropDown con Bootstrap ---------------------------------
  // Creamos un listado con la cantidad de dropdown en la página (variable)
  isOpen = [false, false, false, false, false, false, false, false, false];
  // Creamos el método
  toggleDropdown(index: number) {
    this.isOpen[index] = !this.isOpen[index];
  };

  // Total seleccionado
  total(indice: any){
    // Verificamos que la cantidad seleccionada sea válida
    if (this.cantidad > 0) {
      // Verificamos que la cantidad seleccionada no supere al stock
      if (this.cantidad <= this.sharedService.productos[indice].cantidad) {
        // Calculamos el total del producto seleccionado
        const total = this.sharedService.productos[indice].precio * this.cantidad;
        // Seteamos el valor del total en la etiqueta mediante su id
        const elemento = document.getElementById(`total_${indice + 1}`);
        if (elemento) {
          elemento.textContent = `Total: $${total}`;
        };
      } else {
        alert("¡Oh, oh! Este artículo supera la cantidad en stock. Favor disminuir y volver a intentar.");
      };
    } else {
      // Notificamos error
      alert("-.- Debes seleccionar una cantidad mayor a cero. Intenta nuevamente.");
    };
  };

  // Artículos para el carrito
  // Métodos
  aumentar(event:any){
    // Controlamos el hecho de no interactuar con el input y comprar 0 productos
    if (this.cantidad > 0) {
      // Rescatamos el id del producto seleccionado
      this.id_producto = event.target.id.substring(0,1);
      // Buscamos el producto dentro del listado de prodcutos
      for (let index = 0; index < this.sharedService.productos.length; index++) {
        if (this.sharedService.productos[index].codigo == parseInt(this.id_producto)) {
          // Verificamos que posea stock
          if (this.sharedService.productos[index].cantidad >= this.cantidad) {
            // Obtenemos el nombre del producto
            this.nombre_producto = this.sharedService.productos[index].nombre;
            // Obtenemos el total de la compra
            this.total_compra = this.sharedService.productos[index].precio * this.cantidad;
            // Disminuimos el stock del producto
            this.sharedService.productos[index].cantidad -= this.cantidad;
            // Aumentamos el carrrito
            this.sharedService.aumentarCarrito(this.cantidad)
            // Ejecutamos el showtoaster
            this.showToaster()
            // Verificamos el tipo de envío o despacho y asignamos valor
            var tipo_envio = event.target.id.substring(2,3);
            if (tipo_envio == '1') {
              this.costo_envio = 0;
            } else if (tipo_envio == '2') {
              this.costo_envio = 3000;
            } else {
              this.costo_envio = 10000;
            };
            // Agregamos los artículos al carrito, para poder listarlos
            this.sharedService.agregarCarrito(index, this.cantidad)
          } else {
            alert("¡Oh, oh! Este producto se ha quedado sin stock :( Pero pronto te avisaremos cuando esté nuevamente disponible.");
          };
        }; 
      };
    } else {
      // Notificamos error
      alert("-.- Debes seleccionar una cantidad mayor a cero. Vuelve a intentarlo.");
    };
  };

  // --------------------------------- Toasts con Bootstrap ---------------------------------
  // Variable para mostrar el toast
  showToast = false;
  // Temporizador
  toastTimeout: any;
  // Método para mostrar el toast
  showToaster() {
    clearTimeout(this.toastTimeout); // Limpiar el temporizador anterior (si existe)
    this.showToast = true;
    this.toastTimeout = setTimeout(() => {
      this.showToast = false;
    }, 5000); // Ocultar automáticamente el Toast después de 5 segundos
  };
  // Método para ocultar el toast
  hideToaster() {
    clearTimeout(this.toastTimeout);
    this.showToast = false;
  };

  scrollToTop() {
    // Desplazar hacia el inicio con una animación suave (smooth scroll)
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Agregar una animación suave al desplazamiento
    });
  };

};

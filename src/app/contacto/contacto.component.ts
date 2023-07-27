import { Component } from '@angular/core';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {

  nombre = '';
  apellido_1 = '';
  apellido_2 = '';
  correo = '';
  telefono = 0
  condiciones = false;

  verDatos(){
    // Verificamos que se hayan ingresado todos los campos
    if (this.nombre.length == 0) {
      alert("ERROR: Debe ingresar su nombre. Por favor, intente nuevamente.");
    } else if (this.apellido_1.length == 0) {
      alert("ERROR: Debe ingresar su primer apellido. Por favor, intente nuevamente.");
    } else if (this.apellido_2.length == 0) {
      alert("ERROR: Debe ingresar su segundo apellido. Por favor, intente nuevamente.");
    } else if (this.correo.length == 0) {
      alert("ERROR: Debe ingresar su correo. Por favor, intente nuevamente.");
    } else if ((this.telefono).toString().length < 9) {
      alert("ERROR: Debe ingresar su teléfono. Por favor, intente nuevamente.");
    } else if (this.condiciones == false) {
      alert("ERROR: Debe aceptar las condiciones. Por favor, intente nuevamente.")
    } else {
      // Mostramos los datos
      alert(`Resumen de datos:\n\nNombre: ${this.nombre}\nApellidos: ${this.apellido_1} ${this.apellido_2}\nCorreo: ${this.correo}\nTeléfono: ${this.telefono}\nAcepta condiciones: ${this.condiciones}`);
    };
  };
};

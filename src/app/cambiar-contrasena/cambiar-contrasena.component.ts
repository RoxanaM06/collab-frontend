import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.component.html',
  styleUrls: ['./cambiar-contrasena.component.scss']
})
export class CambiarContrasenaComponent {

  contraActual:string;
  nuevaContra:string;
  confirmeContra:string;

  constructor(private modalSS:ModalService) { }

  async cambiarContra() {
    let idU:string = '';

    let usuario = window.localStorage.getItem('collab')
    if (usuario!=null) {
      idU = JSON.parse(usuario).idUsuario;
    }

    let respuesta = await fetch(`http://localhost:3000/usuario/contrasena`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          "_id": idU,
          "contrasena": this.nuevaContra,
          "contrasenaAnterior": this.contraActual
        })
      });
      let contraCambiada = await respuesta.json();
      console.log("contraCambiada:",contraCambiada)
		this.closeModal();
	}
  
  closeModal() {
		this.modalSS.$modalCambContra.emit(false);
	}
  
}

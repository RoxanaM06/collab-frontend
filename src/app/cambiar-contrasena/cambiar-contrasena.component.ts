import { Component, OnInit } from '@angular/core';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.component.html',
  styleUrls: ['./cambiar-contrasena.component.scss']
})
export class CambiarContrasenaComponent {

  constructor(private modalSS:ModalService) { }

  closeModal() {
		this.modalSS.$modalCambContra.emit(false);
	}
  
}

import { Component } from '@angular/core';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.component.html',
  styleUrls: ['./recuperar-contrasena.component.scss']
})
export class RecuperarContrasenaComponent {

  constructor(private modalSS: ModalService) { }

  closeModal() {
		this.modalSS.$modalRContra.emit(false);
	}
}

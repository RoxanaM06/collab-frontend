import { Component } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.component.html',
  styleUrls: ['./recuperar-contrasena.component.scss']
})
export class RecuperarContrasenaComponent {

  correo = new FormControl('', [Validators.required, Validators.pattern(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i)]);

  constructor(private modalSS: ModalService) { }

  closeModal() {
		this.modalSS.$modalRContra.emit(false);
	}

  closeModals() {
    this.modalSS.$modalRContra.emit(false);
    this.modalSS.$modalInicio.emit(false);
  }

  enviarCorreo() {
    console.log('Correo válido: ',this.correo.valid);
    this.closeModals();
  }
}

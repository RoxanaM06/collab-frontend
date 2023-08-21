import { Component } from '@angular/core';
import { ModalService } from '../modal.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.component.html',
  styleUrls: ['./crear-cuenta.component.scss']
})
export class CrearCuentaComponent {

  formularioCrearCuenta = new FormGroup({
    correo: new FormControl('',[Validators.required]),
    usuario: new FormControl('',[Validators.required]),
    contrasena: new FormControl('',[Validators.required]),
    confirmeContra: new FormControl('',[Validators.required])
  });

  constructor(private modalSS: ModalService) { }

  closeModal() {
		this.modalSS.$modalCrearC.emit(false);
	}

  closeModals() {
    this.modalSS.$modalCrearC.emit(false);
    this.modalSS.$modalInicio.emit(false);
  }

}

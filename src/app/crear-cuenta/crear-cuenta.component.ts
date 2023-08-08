import { Component } from '@angular/core';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.component.html',
  styleUrls: ['./crear-cuenta.component.scss']
})
export class CrearCuentaComponent {

  constructor(private modalSS: ModalService) { }

  closeModal() {
		this.modalSS.$modalCC.emit(false);
	}

  closeModals() {
    this.modalSS.$modalCC.emit(false);
    this.modalSS.$modalInicio.emit(false);
  }

}

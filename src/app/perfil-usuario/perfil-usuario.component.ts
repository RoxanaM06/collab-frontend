import { Component } from '@angular/core';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.scss']
})
export class PerfilUsuarioComponent {

  modalSwitchCambContra:boolean;

	constructor(private modalSS:ModalService) { }

	ngOnInit(): void {
		this.modalSS.$modalCambContra.subscribe((valor)=>this.modalSwitchCambContra = valor);
	}

	openModal() {
		this.modalSwitchCambContra = true;
	}

}

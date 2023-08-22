import { Component } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { NavbarService } from 'src/services/navbar.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.scss']
})
export class PerfilUsuarioComponent {

  modalSwitchCambContra:boolean;

	constructor(private modalSS:ModalService,
				private navbarS:NavbarService) { }

	ngOnInit(): void {
		this.modalSS.$modalCambContra.subscribe((valor)=>this.modalSwitchCambContra = valor);
		this.navbarS.$opcionesProyecto.emit(false);
	}

	openModal() {
		this.modalSwitchCambContra = true;
	}

}

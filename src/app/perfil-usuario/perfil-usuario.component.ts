import { Component } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { NavbarService } from 'src/services/navbar.service';
import { Usuario } from 'src/models/usuario.model';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.scss']
})
export class PerfilUsuarioComponent {

  	modalSwitchCambContra:boolean;
  	idUsuario:string;
	usuarioActual:any;

	constructor(private modalSS:ModalService,
				private navbarS:NavbarService) { }

	async ngOnInit() {
		this.modalSS.$modalCambContra.subscribe((valor)=>this.modalSwitchCambContra = valor);
		this.navbarS.$opcionesProyecto.emit(false);
		let usuario = await this.obtenerUsuario();
		this.usuarioActual = usuario.usuarioObtenido;
		console.log("Usuario en el ngOnInit", this.usuarioActual);
	}

	openModal() {
		this.modalSwitchCambContra = true;
	}

	async obtenerUsuario() {

		let usuario = window.localStorage.getItem("collab");

		if(usuario!=null){
			this.idUsuario = JSON.parse(usuario).idUsuario;
		}
		
		let respuesta = await fetch(`http://localhost:3000/usuario/${this.idUsuario}`, {
	    	method: "GET",
	      	headers: {
	       		"Content-type": "application/json"
	     	}
	    });
	    let usuarioObtenido = await respuesta.json();

		return usuarioObtenido;
	}

}

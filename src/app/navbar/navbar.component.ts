import { Component, OnInit } from '@angular/core';

import { ModalService } from '../../services/modal.service';
import { Router } from '@angular/router';
import { NavbarService } from 'src/services/navbar.service';
import { UsuarioService } from 'src/services/usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

	modalSwitchInicio:boolean;
	esconderUsuario: boolean;
	opcionesProyecto: boolean;
	btnIniciarSesion: boolean;
	nombreUsuario: String|null;

	constructor(private modalSS:ModalService,
				private navbarS: NavbarService,
				private router: Router,
				private usuarioS: UsuarioService) { }

	ngOnInit(): void {
		this.modalSS.$modalInicio.subscribe((valor)=>this.modalSwitchInicio = valor);
		this.navbarS.$esconderUsuario.subscribe((valor)=>this.esconderUsuario = valor);
		this.navbarS.$opcionesProyecto.subscribe((valor)=>this.opcionesProyecto = valor);
		this.navbarS.$btnIniciarSesion.subscribe((valor)=>this.btnIniciarSesion = valor);
		this.usuarioS.$nombreUsuario.subscribe((valor)=>this.nombreUsuario = valor);
		let usuarioLocalStorage = window.localStorage.getItem("collab");
		if (usuarioLocalStorage != null) {
			// this.nombreUsuario = JSON.parse(usuarioLocalStorage).usuario;
			this.navbarS.$btnIniciarSesion.emit(false);
		    this.navbarS.$esconderUsuario.emit(false);
		    this.navbarS.$opcionesProyecto.emit(true);
		}else{
			this.navbarS.$btnIniciarSesion.emit(true);
		    this.navbarS.$esconderUsuario.emit(true);
		    this.navbarS.$opcionesProyecto.emit(false);
		}
	}
	
	openModal() {
		this.modalSwitchInicio = true;
	}
	
	cerrarSesion(){
		this.router.navigate(['/home']);
		this.navbarS.$btnIniciarSesion.emit(true);
		this.navbarS.$esconderUsuario.emit(true);
		this.navbarS.$opcionesProyecto.emit(false);
		this.nombreUsuario = null;
		window.localStorage.removeItem("collab");
	}
	
}

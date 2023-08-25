import { Component, OnInit } from '@angular/core';

import { ModalService } from '../../services/modal.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarService } from 'src/services/navbar.service';
import { UsuarioService } from 'src/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	modalSwitchRContra:boolean;
	modalSwitchCrearC:boolean;

	formularioRegistro = new FormGroup({
		usuario: new FormControl('', [Validators.required]),
		contrasena: new FormControl('', [Validators.required])
	});

	constructor(private modalSS: ModalService,
				private router: Router,
				private navbarS: NavbarService,
				private usuarioS: UsuarioService) { }

	ngOnInit() {
		this.modalSS.$modalRContra.subscribe((valor)=>this.modalSwitchRContra = valor);
		this.modalSS.$modalCrearC.subscribe((valor)=>this.modalSwitchCrearC = valor);
	}
	
	openModalRContra() {
		this.modalSwitchRContra = true;
	}
	
	openModalCrearC() {
		this.modalSwitchCrearC = true;
	}
	
	closeModal() {
		this.modalSS.$modalInicio.emit(false);
	}
	
	async login() {

		let respuesta = await fetch("http://localhost:3000/usuario/login", {
	    	method: "POST",
	      	headers: {
	       		"Content-type": "application/json"
	     	},
	      	body: JSON.stringify(this.formularioRegistro.value)
	    });
	    let usuarioActual = await respuesta.json();
	    console.log(usuarioActual);
		this.usuarioS.$nombreUsuario.emit(usuarioActual.usuario);
	    
	    if(usuarioActual.exito == true){
			this.closeModal();
			console.log('Formulario válido: ',this.formularioRegistro.valid);
			console.log(this.formularioRegistro.value);
			this.router.navigate(['/proyectos']);
			this.navbarS.$esconderUsuario.emit(false);
			this.navbarS.$btnIniciarSesion.emit(false);
			// window.localStorage.setItem("collab",JSON.stringify(this.formularioRegistro.value));
			// window.localStorage.setItem("collab",`${true}`);
	    }
		
		let infoUsuario = {
			idUsuario: usuarioActual.usuario._id,
			usuario: usuarioActual.usuario.usuario
			// idPlan: usuarioActual.usuario.IdPlan
		}
		
		this.guardarEnLocalStorage(infoUsuario);
	}
	
	guardarEnLocalStorage(infoUsuario:any) {

		window.localStorage.setItem("collab",JSON.stringify(infoUsuario));
		//Lo emito desde aquí para que se actualice el nombre en el navbar
		let usuarioLocalStorage = window.localStorage.getItem("collab");
		if (usuarioLocalStorage != null) {
		  this.usuarioS.$nombreUsuario.emit(JSON.parse(usuarioLocalStorage).usuario);
		}
	}
	
	get usuario() {
		return this.formularioRegistro.get('usuario');
	}
	
	get contrasena() {
		return this.formularioRegistro.get('contrasena');
	}
}

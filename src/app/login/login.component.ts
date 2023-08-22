import { Component, OnInit } from '@angular/core';

import { ModalService } from '../../services/modal.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarService } from 'src/services/navbar.service';
import { Globals } from 'src/globals';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
//   closeResult = '';
//   modalRef: NgbModalRef | null;

// 	constructor(private modalService: NgbModal,
// 				private modalSharedService: ModalService) {}

// 	acceder() {
// 		// Lógica para iniciar sesión
// 		this.modalSharedService.close();
// 	}

// 	open(content:any) {
// 		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
// 			(result) => {
// 				this.closeResult = `Closed with: ${result}`;
// 			},
// 			(reason) => {
// 				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
// 			},
// 		);
// 	}

// 	private getDismissReason(reason: any): string {
// 		if (reason === ModalDismissReasons.ESC) {
// 			return 'by pressing ESC';
// 		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
// 			return 'by clicking on a backdrop';
// 		} else {
// 			return `with: ${reason}`;
// 		}
// 	}
	modalSwitchRContra:boolean;
	modalSwitchCrearC:boolean;

	formularioRegistro = new FormGroup({
		usuario: new FormControl('', [Validators.required]),
		contrasena: new FormControl('', [Validators.required])
	});

	constructor(private modalSS: ModalService,
				private router: Router,
				private navbarS: NavbarService) { }

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
		// console.log(this.formularioRegistro.value);
		// if (this.formularioRegistro.value.usuario == 'Roxana' && this.formularioRegistro.value.contrasena == '123') {
		// 	this.closeModal();
		// 	console.log('Formulario válido: ',this.formularioRegistro.valid);
		// 	console.log(this.formularioRegistro.value);
		// 	this.router.navigate(['/proyectos']);
		// 	this.navbarS.$esconderUsuario.emit(false);
		// 	this.navbarS.$btnIniciarSesion.emit(false);
		// } else {
		// 	console.log('Credenciales inválidas');
		// }

		let respuesta = await fetch("http://localhost:3000/login", {
	    	method: "POST",
	      	headers: {
	       		"Content-type": "application/json"
	     	},
	      	body: JSON.stringify(this.formularioRegistro.value)
	    });
	    let usuarioActual = await respuesta.json();
	    console.log(usuarioActual);
	    Globals.usuarioActual = usuarioActual.usuario;
	    console.log("Usuario Global",Globals.usuarioActual);
	    
	    if(usuarioActual.exito == true){
			this.closeModal();
			console.log('Formulario válido: ',this.formularioRegistro.valid);
			console.log(this.formularioRegistro.value);
			this.router.navigate(['/proyectos']);
			this.navbarS.$esconderUsuario.emit(false);
			this.navbarS.$btnIniciarSesion.emit(false);
	    }
	}
	
	get usuario() {
		return this.formularioRegistro.get('usuario');
	}
}

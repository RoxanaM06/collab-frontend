import { Component, OnInit } from '@angular/core';

import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from '../../services/modal.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarService } from 'src/services/navbar.service';

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
	
	login() {
		if (this.formularioRegistro.value.usuario == 'Roxana' && this.formularioRegistro.value.contrasena == '123') {
			this.closeModal();
			console.log('Formulario válido: ',this.formularioRegistro.valid);
			console.log(this.formularioRegistro.value);
			this.router.navigate(['/proyectos']);
			this.navbarS.$esconderUsuario.emit(false);
			this.navbarS.$btnIniciarSesion.emit(false);
		} else {
			console.log('Credenciales inválidas');
		}
	}
	
	get usuario() {
		return this.formularioRegistro.get('usuario');
	}
}

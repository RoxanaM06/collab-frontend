import { Component, OnInit } from '@angular/core';

import { ModalService } from '../../services/modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarService } from 'src/services/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
	// modalRef: NgbModalRef | null;
	// private modalSubscription: Subscription;

	// closeResult = '';

	// constructor(private modalService: NgbModal, 
	// 			private modalSharedService: ModalService) {
	// 	this.modalSubscription = this.modalSharedService.closeModal$.subscribe(() => {
	// 	  this.cerrarModal();
	// 	});
	// }

	// cerrarModal() {
	// 	if (this.modalRef) {
	// 	  this.modalRef.dismiss('Cross click');
	// 	  this.modalRef = null;
	// 	}
	// }
  	
	// open(content:any) {
	// 	this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
	// 		(result) => {
	// 			this.closeResult = `Closed with: ${result}`;
	// 		},
	// 		(reason) => {
	// 			this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
	// 		},
	// 	);
	// }

	// private getDismissReason(reason: any): string {
	// 	if (reason === ModalDismissReasons.ESC) {
	// 		return 'by pressing ESC';
	// 	} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
	// 		return 'by clicking on a backdrop';
	// 	} else {
	// 		return `with: ${reason}`;
	// 	}
	// }

	modalSwitchInicio:boolean;
	esconderUsuario: boolean = true;
	opcionesProyecto: boolean;
	btnIniciarSesion: boolean = true;

	constructor(private modalSS:ModalService,
				private route: ActivatedRoute,
				private navbarS: NavbarService,
				private router: Router) { }

	ngOnInit(): void {
		this.modalSS.$modalInicio.subscribe((valor)=>this.modalSwitchInicio = valor);
		this.navbarS.$esconderUsuario.subscribe((valor)=>this.esconderUsuario = valor);
		this.navbarS.$opcionesProyecto.subscribe((valor)=>this.opcionesProyecto = valor);
		this.navbarS.$btnIniciarSesion.subscribe((valor)=>this.btnIniciarSesion = valor);
		// this.route.url.subscribe(urlSegments => {
		// 	const urlPath = urlSegments.join('/'); // Convertir los segmentos en una cadena
		// 	console.log(urlPath);
		// 	// Verificar si estamos en la página de inicio o en la ruta /home
		// 	if (urlPath === '' || urlPath === 'home') {
		// 	  this.esconderUsuario = true;
		// 	}
		// 	if (urlPath === 'crear-proyecto' || urlPath === 'editar-proyecto'){
		// 		this.opcionesProyecto = true;
		// 	}
		// });
	}
	
	openModal() {
		this.modalSwitchInicio = true;
	}
	
	cerrarSesion(){
		this.router.navigate(['/home']);
		this.navbarS.$btnIniciarSesion.emit(true);
		this.navbarS.$esconderUsuario.emit(true);
		this.navbarS.$opcionesProyecto.emit(false);
	}
	
}

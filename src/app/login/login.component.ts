import { Component, OnInit } from '@angular/core';

import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from '../modal.service';

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
	modalSwitchCC:boolean;

	constructor(private modalSS: ModalService) { }

	ngOnInit() {
		this.modalSS.$modalRContra.subscribe((valor)=>this.modalSwitchRContra = valor);
		this.modalSS.$modalCC.subscribe((valor)=>this.modalSwitchCC = valor);
	}
	
	openModalRContra() {
		this.modalSwitchRContra = true;
	}
	
	openModalCC() {
		this.modalSwitchCC = true;
	}
	
	closeModal() {
		this.modalSS.$modalInicio.emit(false);
	}
}

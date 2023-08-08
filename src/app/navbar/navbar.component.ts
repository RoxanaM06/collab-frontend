import { Component, OnDestroy, OnInit } from '@angular/core';

import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ModalService } from '../modal.service';

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

	constructor(private modalSS:ModalService) { }

	ngOnInit(): void {
		this.modalSS.$modalInicio.subscribe((valor)=>this.modalSwitchInicio = valor);
	}

	openModal() {
		this.modalSwitchInicio = true;
	}
	
}

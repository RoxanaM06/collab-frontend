import { Component, OnInit } from '@angular/core';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-vista-proyectos',
  templateUrl: './vista-proyectos.component.html',
  styleUrls: ['./vista-proyectos.component.scss']
})
export class VistaProyectosComponent implements OnInit {

  modalSwitchRContra:boolean;
  modalSwitchCC:boolean;

  constructor(private modalSS:ModalService) { }

  ngOnInit() {
		this.modalSS.$modalRContra.subscribe((valor)=>this.modalSwitchRContra = valor);
		this.modalSS.$modalCrearC.subscribe((valor)=>this.modalSwitchCC = valor);
	}
}

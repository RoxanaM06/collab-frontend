import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { NavbarService } from 'src/services/navbar.service';
import { UsuarioService } from 'src/services/usuario.service';

@Component({
  selector: 'app-vista-proyectos',
  templateUrl: './vista-proyectos.component.html',
  styleUrls: ['./vista-proyectos.component.scss']
})
export class VistaProyectosComponent implements OnInit {

  modalSwitchRContra:boolean;
  modalSwitchCC:boolean;

  constructor(private modalSS:ModalService,
              private navbarS:NavbarService,
              private usuarioS:UsuarioService) { }

  ngOnInit() {
		this.modalSS.$modalRContra.subscribe((valor)=>this.modalSwitchRContra = valor);
		this.modalSS.$modalCrearC.subscribe((valor)=>this.modalSwitchCC = valor);
    this.navbarS.$opcionesProyecto.emit(false);
    //Si comento las lineas siguientes se elimina el nombre del usuario cuando recargo la página
    let usuarioLocalStorage = window.localStorage.getItem("collab");
		if (usuarioLocalStorage != null) {
  		this.usuarioS.$nombreUsuario.emit(JSON.parse(usuarioLocalStorage).usuario);
		}
	}
}

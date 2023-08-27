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
  idUsuario:string;
  proyectosUsuario:any;

  constructor(private modalSS:ModalService,
              private navbarS:NavbarService,
              private usuarioS:UsuarioService) { }

  async ngOnInit() {
		this.modalSS.$modalRContra.subscribe((valor)=>this.modalSwitchRContra = valor);
		this.modalSS.$modalCrearC.subscribe((valor)=>this.modalSwitchCC = valor);
    this.navbarS.$opcionesProyecto.emit(false);
    //Si comento las lineas siguientes se elimina el nombre del usuario cuando recargo la página
    let usuarioLocalStorage = window.localStorage.getItem("collab");
		if (usuarioLocalStorage != null) {
  		this.usuarioS.$nombreUsuario.emit(JSON.parse(usuarioLocalStorage).usuario);
		}
    //Para obtener los proyectos
    let proyecto = await this.obtenerProyectos();
		this.proyectosUsuario = proyecto.nombresProyectos;
		console.log("Proyectos usuario:", this.proyectosUsuario);
	}

  async obtenerProyectos() {

		let usuario = window.localStorage.getItem("collab");

		if(usuario!=null){
			this.idUsuario = JSON.parse(usuario).idUsuario;
      console.log("idUsuario",this.idUsuario);
		}
		
		let respuesta = await fetch(`http://localhost:3000/usuario/proyectos/${this.idUsuario}`, {
	    	method: "GET",
	      	headers: {
	       		"Content-type": "application/json"
	     	}
	    });
	    let proyectosObtenidos = await respuesta.json();

		return proyectosObtenidos;
	}
}

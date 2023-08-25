import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavbarService } from 'src/services/navbar.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/models/usuario.model';
import { UsuarioService } from 'src/services/usuario.service';

@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.component.html',
  styleUrls: ['./crear-cuenta.component.scss']
})
export class CrearCuentaComponent {

  formularioCrearCuenta = new FormGroup({
    correo: new FormControl('',[Validators.required, Validators.pattern(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i)]),
    usuario: new FormControl('',[Validators.required]),
    contrasena: new FormControl('',[Validators.required]),
    confirmeContra: new FormControl('',[Validators.required])
  });

  nuevoUsuario: Usuario;
  planSeleccionado: any = 0;

  constructor(private modalSS: ModalService,
              private navbarS: NavbarService,
              private router: Router,
              private usuarioS: UsuarioService) { }

  // ngOnInit() {
  //     this.obtenerPlanes();
  // }

  closeModal() {
		this.modalSS.$modalCrearC.emit(false);
	}

  closeModals() {
    this.modalSS.$modalCrearC.emit(false);
    this.modalSS.$modalInicio.emit(false);
  }

  get correo() {
		return this.formularioCrearCuenta.get('correo');
	}

  get usuario() {
		return this.formularioCrearCuenta.get('usuario');
	}

  get contrasena() {
		return this.formularioCrearCuenta.get('contrasena');
	}

  get confirmeContra() {
		return this.formularioCrearCuenta.get('confirmeContra');
	}

  // async obtenerPlanes() {
  //   let respuesta = await fetch("http://localhost:3000/planes", {
	//   	method: "GET",
	//     	headers: {
	//      		"Content-type": "application/json"
	//    	}
	//   });
	//   this.planes = await respuesta.json();
  // }

  async crearCuenta() {

    this.nuevoUsuario = {
      usuario: this.formularioCrearCuenta.value.usuario,
      correo: this.formularioCrearCuenta.value.correo,
      contrasena: this.formularioCrearCuenta.value.contrasena,
      IdPlan: this.planSeleccionado,
      proyectos: []
    }

		let respuesta = await fetch("http://localhost:3000/usuario/crear", {
	  	method: "POST",
	    	headers: {
	     		"Content-type": "application/json"
	   	},
	    	body: JSON.stringify(this.nuevoUsuario)
	  });
	  let usuarioActual = await respuesta.json();
	  // this.usuarioS.$nombreUsuario.emit(usuarioActual.usuario);
	  
	  if(usuarioActual){
  		this.closeModals();
  		this.router.navigate(['/proyectos']);
      console.log(usuarioActual.mensaje)
  		this.navbarS.$esconderUsuario.emit(false);
  		this.navbarS.$btnIniciarSesion.emit(false);

      let infoUsuario = {
        usuario: usuarioActual.usuarioNuevo.usuario,
        idPlan: usuarioActual.usuarioNuevo.IdPlan
      }

  		window.localStorage.setItem("collab",JSON.stringify(infoUsuario));
      //Lo emito desde aquí para que se actualice el nombre en el navbar
      let usuarioLocalStorage = window.localStorage.getItem("collab");
      if (usuarioLocalStorage != null) {
        this.usuarioS.$nombreUsuario.emit(JSON.parse(usuarioLocalStorage).usuario);
      }
	  }
	}
}
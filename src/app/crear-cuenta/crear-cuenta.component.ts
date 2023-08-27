import { Component } from '@angular/core';
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
    confirmeContra: new FormControl('',[Validators.required]),
    seleccionarPlan: new FormControl('',[Validators.required])
  });

  nuevoUsuario: Usuario;
  // planSeleccionado: any = 0;
  cantidadPlanes: number;

  constructor(private modalSS: ModalService,
              private navbarS: NavbarService,
              private router: Router,
              private usuarioS: UsuarioService) { }

  // ngOnInit() {
  //     this.obtenerPlanes();
  // }

  // ngAfterViewInit() {
  //   this.formularioCrearCuenta.value.seleccionarPlan = "0";
    
  //   // this.formularioCrearCuenta.get('confirmeContra').setValidators([Validators.required, this.validarContrasenas.bind(this)]);

  //   this.formularioCrearCuenta.get('contrasena').valueChanges.subscribe(() => {
  //     const confirmeContraControl = this.formularioCrearCuenta.get('confirmeContra');
    
  //     if (confirmeContraControl) {
  //       // Actualizar la validación de confirmeContra al cambiar la contraseña
  //       confirmeContraControl.updateValueAndValidity();
  //     }
  //   });
  // }
  
  // validarContrasenas(control: AbstractControl) {
  //   const contrasena = this.formularioCrearCuenta.get('contrasena').value;
  //   const confirmeContra = control.value;
  
  //   return contrasena === confirmeContra ? null : { noCoinciden: true };
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

    if(this.formularioCrearCuenta.value.seleccionarPlan == "1"){
      this.cantidadPlanes = 3;
    }else if(this.formularioCrearCuenta.value.seleccionarPlan == "2"){
      this.cantidadPlanes = 10;
    }else if(this.formularioCrearCuenta.value.seleccionarPlan == "3"){
      this.cantidadPlanes = 30;
    }else {
      console.log("No se seleccionó un plan");
    }

    console.log("Curiosidad: ", this.formularioCrearCuenta)

    this.nuevoUsuario = {
      usuario: this.formularioCrearCuenta.value.usuario,
      correo: this.formularioCrearCuenta.value.correo,
      contrasena: this.formularioCrearCuenta.value.contrasena,
      plan: {
        idPlan: this.formularioCrearCuenta.value.seleccionarPlan,
        cantidad: this.cantidadPlanes
      },
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
	  
	  if(usuarioActual){
  		this.closeModals();
  		this.router.navigate(['/proyectos']);
      console.log(usuarioActual.mensaje)
  		this.navbarS.$esconderUsuario.emit(false);
  		this.navbarS.$btnIniciarSesion.emit(false);

      let infoUsuario = {
        idUsuario: usuarioActual.usuario._id,
        usuario: usuarioActual.usuario.usuario
        // idPlan: usuarioActual.usuario.IdPlan
      }

      this.guardarEnLocalStorage(infoUsuario);
	  }
	}

  guardarEnLocalStorage(infoUsuario:any) {

    window.localStorage.setItem("collab",JSON.stringify(infoUsuario));
    //Lo emito desde aquí para que se actualice el nombre en el navbar
    let usuarioLocalStorage = window.localStorage.getItem("collab");
    if (usuarioLocalStorage != null) {
      this.usuarioS.$nombreUsuario.emit(JSON.parse(usuarioLocalStorage).usuario);
    }
  }
}
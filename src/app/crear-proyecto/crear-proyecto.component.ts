import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavbarService } from 'src/services/navbar.service';

@Component({
  selector: 'app-crear-proyecto',
  templateUrl: './crear-proyecto.component.html',
  styleUrls: ['./crear-proyecto.component.scss']
})
export class CrearProyectoComponent implements OnInit {

  constructor(private navbarS:NavbarService,
              private route:ActivatedRoute) { }

  idProyecto:string|null;
  proyectoUsuario:any;
  opcion:any;
  idUsuario:string;
  nombreProyecto:string;
  descripcionProyecto:string;
  htmlProyecto:string;
  cssProyecto:string;
  jsProyecto:string;

  async ngOnInit() {
    this.navbarS.$opcionesProyecto.emit(true);
    this.route.paramMap.subscribe(params=>{
      this.idProyecto = params.get('id');
      this.opcion = params.get('editar')
    });
    
    if (this.opcion=='editar') {
      let proyecto = await this.obtenerProyecto(this.idProyecto);
		  this.proyectoUsuario = proyecto;
		  console.log("Proyecto usuario:", this.proyectoUsuario);
    }
	
  }

  async obtenerProyecto(idProyecto:string|null){

    let idUsuario:string = '';

    let usuario = window.localStorage.getItem('collab')
    if (usuario) {
      idUsuario = JSON.parse(usuario);
    }

    if (idProyecto!=null) {
      let respuesta = await fetch(`http://localhost:3000/usuario/${idUsuario}/proyecto/${idProyecto}`, {
        method: "GET",
          headers: {
             "Content-type": "application/json"
         }
      });
      let proyectoObtenido = await respuesta.json();
      return proyectoObtenido;
    }
  }

  async crearProyecto() {

    let usuario = window.localStorage.getItem("collab")

    if (usuario!=null) {
      this.idUsuario = JSON.parse(usuario).idUsuario;
    }

    let respuesta = await fetch(`http://localhost:3000/usuario/crear/proyecto`, {
        method: "POST",
          headers: {
             "Content-type": "application/json"
         },
         body: JSON.stringify({
          "IdUsuario": this.idUsuario,
          "Proyectos":
          {
          "IdUsuario": 0,
          "IdProyecto": 0,
          "nombre":this.nombreProyecto,
          "descripcion":this.descripcionProyecto,
          "HTML":this.htmlProyecto,
          "CSS":this.cssProyecto,
          "JavaScript":this.jsProyecto
          }
        
        })
      });
      let proyectoCreado = await respuesta.json();
      console.log("Proyecto creado",proyectoCreado)
  }

}

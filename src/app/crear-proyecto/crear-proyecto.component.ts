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
		  console.log("Proyecto usuario:", proyecto);
    }
	
  }

  async obtenerProyecto(idProyecto:string|null){

    let idU:string = '';

    let usuario = window.localStorage.getItem('collab')
    if (usuario!=null) {
      idU = JSON.parse(usuario).idUsuario;
    }

    if (idProyecto!=null) {
      let respuesta = await fetch(`http://localhost:3000/usuario/${idU}/proyecto/${idProyecto}`, {
        method: "GET",
          headers: {
             "Content-type": "application/json"
         }
      });
      let proyectoObtenido = await respuesta.json();
      console.log("ProyectoObtenido",proyectoObtenido);
      this.nombreProyecto = proyectoObtenido.proyectosOb.nombre;
      this.descripcionProyecto = proyectoObtenido.proyectosOb.descripcion;
      this.htmlProyecto = proyectoObtenido.proyectosOb.HTML;
      this.cssProyecto = proyectoObtenido.proyectosOb.CSS;
      this.jsProyecto = proyectoObtenido.proyectosOb.JavaScript;
    }
  }

  async crearProyecto() {

    let usuario = window.localStorage.getItem("collab")

    if (usuario!=null) {
      this.idUsuario = JSON.parse(usuario).idUsuario;
    }

    if (this.opcion!='editar') {
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
    }else{
      let respuesta = await fetch(`http://localhost:3000/usuario/actualizar/proyecto`, {
        method: "PATCH",
          headers: {
             "Content-type": "application/json"
         },
         body: JSON.stringify({
          "usuarioID": this.idUsuario,
          "proyecto" : this.idProyecto, 
          "datosProyecto": {
              "nombre":this.nombreProyecto,
              "descripcion":this.descripcionProyecto,
              "HTML":this.htmlProyecto,
              "CSS":this.cssProyecto,
              "JavaScript":this.jsProyecto
              }
          })
      });
      let proyectoCEditado = await respuesta.json();
      console.log("Proyecto editado",proyectoCEditado);
    }
  }

}

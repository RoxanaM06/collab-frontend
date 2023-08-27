import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tarjeta-proyecto',
  templateUrl: './tarjeta-proyecto.component.html',
  styleUrls: ['./tarjeta-proyecto.component.scss']
})
export class TarjetaProyectoComponent {

  constructor(private router:Router) { }

  @Input() proyecto:any;

  mostrarProyecto(){
    console.log("Proyecto", this.proyecto);
    this.router.navigate(['/editar-proyecto', this.proyecto._id, 'editar' ]);
  }
}

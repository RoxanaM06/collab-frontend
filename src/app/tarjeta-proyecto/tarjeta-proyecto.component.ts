import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tarjeta-proyecto',
  templateUrl: './tarjeta-proyecto.component.html',
  styleUrls: ['./tarjeta-proyecto.component.scss']
})
export class TarjetaProyectoComponent {

  @Input() proyecto:any;
}

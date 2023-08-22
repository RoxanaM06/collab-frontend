import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/services/navbar.service';

@Component({
  selector: 'app-crear-proyecto',
  templateUrl: './crear-proyecto.component.html',
  styleUrls: ['./crear-proyecto.component.scss']
})
export class CrearProyectoComponent implements OnInit {

  constructor(private navbarS:NavbarService) { }

  ngOnInit(): void {
    this.navbarS.$opcionesProyecto.emit(true);
  }
}

import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/services/navbar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private navbarS: NavbarService) { }

  ngOnInit() {
      this.navbarS.$opcionesProyecto.emit(false);
  }

}

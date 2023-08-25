import { Component } from '@angular/core';
import { NavbarService } from 'src/services/navbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private navbarS:NavbarService) {}

  // ngOnInit(): void {
  //   const miToken = Boolean(window.localStorage.getItem("collab"));
  //   console.log(miToken);
  //   if(miToken == true){
  //     console.log("Token", miToken)
  //     this.navbarS.$btnIniciarSesion.emit(false);
  //     this.navbarS.$esconderUsuario.emit(false);
  //     this.navbarS.$opcionesProyecto.emit(true);
  //   }else{
  //     this.navbarS.$btnIniciarSesion.emit(true);
  //     this.navbarS.$esconderUsuario.emit(true);
  //     this.navbarS.$opcionesProyecto.emit(false);
  //   }
  // }
}

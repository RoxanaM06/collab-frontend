import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  $esconderUsuario = new EventEmitter<boolean>;
  $opcionesProyecto = new EventEmitter<boolean>;
  $btnIniciarSesion = new EventEmitter<boolean>;
}

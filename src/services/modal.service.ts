import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  $modalInicio = new EventEmitter<any>();
  $modalRContra = new EventEmitter<any>();
  $modalCrearC = new EventEmitter<any>();
  $modalCambContra = new EventEmitter<any>();
}

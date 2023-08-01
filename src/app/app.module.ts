import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { PlanesInformativosComponent } from './planes-informativos/planes-informativos.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { RecuperarContrasenaComponent } from './recuperar-contrasena/recuperar-contrasena.component';
import { CrearCuentaComponent } from './crear-cuenta/crear-cuenta.component';
import { VistaProyectosComponent } from './vista-proyectos/vista-proyectos.component';
import { TarjetaProyectoComponent } from './tarjeta-proyecto/tarjeta-proyecto.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    PlanesInformativosComponent,
    LandingPageComponent,
    LoginComponent,
    RecuperarContrasenaComponent,
    CrearCuentaComponent,
    VistaProyectosComponent,
    TarjetaProyectoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

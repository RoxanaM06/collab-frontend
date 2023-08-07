import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlanesInformativosComponent } from './planes-informativos/planes-informativos.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { VistaProyectosComponent } from './vista-proyectos/vista-proyectos.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { CrearProyectoComponent } from './crear-proyecto/crear-proyecto.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "landing-page",
    component: LandingPageComponent
  },
  {
    path: "planes",
    component: PlanesInformativosComponent
  },
  {
    path: "proyectos",
    component: VistaProyectosComponent
  },
  {
    path: "perfil",
    component: PerfilUsuarioComponent
  },
  {
    path: 'crear-proyecto',
    component: CrearProyectoComponent
  },
  {
    path: 'editar-proyecto',
    component: CrearProyectoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

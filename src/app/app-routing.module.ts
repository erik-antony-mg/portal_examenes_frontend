import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminGuard } from './services/guard/admin.guard';
import { UserGuard } from './services/guard/user.guard';
import { ProfileComponent } from './pages/admin/profile/profile.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ViewCategoriasComponent } from './pages/admin/view-categorias/view-categorias.component';
import { AddCategoriaComponent } from './pages/admin/add-categoria/add-categoria.component';
import { ViewExamenesComponent } from './pages/admin/view-examenes/view-examenes.component';
import { AddExamenComponent } from './pages/admin/add-examen/add-examen.component';
import { ActualizarExamenComponent } from './pages/admin/actualizar-examen/actualizar-examen.component';
import { ViewPreguntasComponent } from './pages/admin/view-preguntas/view-preguntas.component';
import { AddPreguntaComponent } from './pages/admin/add-pregunta/add-pregunta.component';
import { ActualizarPreguntaComponent } from './pages/admin/actualizar-pregunta/actualizar-pregunta.component';
import { LoadExamenComponent } from './pages/user/load-examen/load-examen.component';
import { InstrucionesComponent } from './pages/user/instruciones/instruciones.component';
import { ComenzarPruebaComponent } from './pages/user/comenzar-prueba/comenzar-prueba.component';
import { InvitadoGuard } from './services/guard/invitado.guard';


const routes: Routes = [
  {
    path: '',
    component:HomeComponent,
    pathMatch: 'full'

  },
  {
    path:'registrar',
    component:SignupComponent,
    pathMatch:'full'
  },
  {
    path: 'login',
    component:LoginComponent,
    pathMatch:'full'
  },
  {
    path: "admin",
    component:AdminDashboardComponent,
   canActivate: [AdminGuard],
    children:[
      {
        path:"perfil",
        component:ProfileComponent
      },
      {
        path:"",
        component:WelcomeComponent
      },
      {
        path:"categorias",
        component:ViewCategoriasComponent
      },
      {
        path:"addCategorias",
        component:AddCategoriaComponent
      },
      {
        path:"examenes",
        component:ViewExamenesComponent
      },
      {
        path:'addExamenes',
        component:AddExamenComponent
      },
      {
        path:"examen/:examenId",
        component:ActualizarExamenComponent
      },
      {
        path:"preguntas/:examenId/:titulo",
        component:ViewPreguntasComponent
      },
      {
        path:"addPregunta/:examenId/:titulo",
        component:AddPreguntaComponent
      },
      {
        path:"preguntas/:preguntaId",
        component:ActualizarPreguntaComponent
      }
    ]
  },
  {
    path: "user",
    component:UserDashboardComponent,
    canActivate: [UserGuard],
    children:[
      {path:":categoriaId",
      component:LoadExamenComponent
      },
      {
        path:"instrucciones/:examenId",
        component:InstrucionesComponent
      }
    ]
  },
  {
      path:"start/:examenId",
      component:ComenzarPruebaComponent,
      canActivate:[InvitadoGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {


  constructor(private loginService: LoginService, private router: Router) {}

  getUsuario() {
    return this.loginService.getName();
  }

  public logout() {
    this.loginService.logout();
    this.router.navigate(['/']);
  }
  estaEnSesion() {
    return this.loginService.isLoggedIn();
  }

  queRollTiene(){
    if (this.loginService.isAdmin()) {
       this.router.navigate(["/admin/perfil"])
    }
    else if(this.loginService.isUser()){
      this.router.navigate(["/user/0"])
    }
  }
}

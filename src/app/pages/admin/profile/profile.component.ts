import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import { UsuarioCompleto } from 'src/shared/UsuarioCompleto';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  user!:UsuarioCompleto;
  username: string | null = null;
  constructor(private userService:UserService,private loginService:LoginService){}

//revisar da un error pero funciona

  ngOnInit(): void {
    this.username = this.loginService.getName();

    if (this.username) {
      this.userService.obtenerUsuario(this.username).subscribe({
        next: (data: UsuarioCompleto) => {
          this.user = data;
        },
        error: (error: any) => {
          console.error("Error al obtener el usuario:", error);
        }
      });
    } else {
      console.warn("El nombre de usuario es null o undefined.");
    }
  }

}

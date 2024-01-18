import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private snack:MatSnackBar,private loginService:LoginService,private router:Router ){}

  ngOnInit(): void {

  }

  loginData={
    "username":'',
    "password":''
  }

  formSubmit(){

    if(this.loginData.username.trim()== '' || this.loginData.username.trim()==null){
      this.snack.open('El nombre de usuario es requerido !!','Aceptar',{
        duration:3000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      })
      return;
    }
    if(this.loginData.password.trim()== '' || this.loginData.password.trim()==null){
      this.snack.open('La contraseña del usuario es requerida !!','Aceptar',{
        duration:3000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      })
      return;
    }

//logica
    this.loginService.login (this.loginData).subscribe({
      next:(resp)=>{
        // console.log(this.loginService.getUserRole());

        if(this.loginService.isAdmin()){
          this.router.navigate(['/admin'])
          this.loginService.loginStatusSubjec.next(true)
        }
        else if(this.loginService.isUser()){
          this.router.navigate(['/user/0'])
          this.loginService.loginStatusSubjec.next(true)
        }else{
          this.router.navigate(['/admin']);
        }
      },
      error:error =>{
        this.snack.open("Ha ocurrido un error en el sistema !", 'aceptar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      }

    })

  }
}

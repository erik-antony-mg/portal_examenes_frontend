import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/shared/Usuario';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
//@ts-ignore
import Swal from 'sweetalert2';
import { formatDate } from '@angular/common';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  //input de fecha
  fecha="";
  maxDate = new Date();


  public user:Usuario={
    nombre:"",
    apellido:"",
    email:"",
    password:"",
    username:"",
    dateBirth:"",
    phone:""
  };



  constructor(private userService: UserService, private snack: MatSnackBar, private router: Router) {

  }

  ngOnInit(): void {


  }



  formSubmit() {
    console.log(this.user);

    if (this.user?.username == '' || this.user?.username == null) {

      this.snack.open("El nombre de usuario es requerido", 'aceptar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });
      return;
    }
    if (this.user?.email == '' || this.user?.email == null) {

      this.snack.open("El email de usuario es requerido", 'aceptar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });
      return;
    }
    if (this.user?.nombre == '' || this.user?.nombre == null) {

      this.snack.open("El campo nombre es requerido", 'aceptar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });
      return;
    }
    if (this.user?.apellido == '' || this.user?.apellido == null) {

      this.snack.open("El apellido de usuario es requerido", 'aceptar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });
      return;
    }

    if (this.user?.password == '' || this.user?.password == null) {

      this.snack.open("La contraseña de usuario es requerida", 'aceptar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });
      return;
    }
    if (this.fecha   == '' || this.fecha == null) {

      this.snack.open("La fecha de nacimiento es requerida", 'aceptar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });
      return;
    }
    if (this.user.phone   == '' || this.user.phone == null) {

      this.snack.open("El telefono es requerida", 'aceptar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });
      return;
    }

     this.user.dateBirth = formatDate(this.fecha, 'dd-MM-yyyy', 'en-US');

    this.userService.registrarUsuario (this.user).subscribe({
      next: data => {
        Swal.fire('Usuario guardado', `usuario ${data.username} registrado con exito en el sistema !`, 'success');
        this.router.navigate(['/login']);
      },
      error: error => {
        console.log(error);
        this.snack.open("Ha ocurrido un error en el sistema !", 'aceptar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      }
    }
    )

  }
}

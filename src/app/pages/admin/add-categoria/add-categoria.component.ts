import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriaService } from 'src/app/services/categoria.service';
//@ts-ignore
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-add-categoria',
  templateUrl: './add-categoria.component.html',
  styleUrls: ['./add-categoria.component.css']
})
export class AddCategoriaComponent {

  constructor(private categoriaService:CategoriaService,private router: Router,private snack:MatSnackBar) {}

  categoria:any={
    titulo:"",
    descripcion:""
  }

  formSubmit(){
    console.log(this.categoria);
    this.categoriaService.createCategoria(this.categoria).subscribe({
      next:(data)=>{
        Swal.fire({
          title: "Categoria guardado",
          text: "categoria  registrado con exito en el sistema !",
          icon: "success",
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['/admin/categorias']);
      },
      error:(e)=> {
        this.snack.open("Ha ocurrido crear una categoria!", 'aceptar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        })
      }
    })

  }
}

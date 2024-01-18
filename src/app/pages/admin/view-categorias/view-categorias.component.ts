import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-view-categorias',
  templateUrl: './view-categorias.component.html',
  styleUrls: ['./view-categorias.component.css']
})
export class ViewCategoriasComponent  implements OnInit{

  constructor(private categoriaService:CategoriaService,private snack: MatSnackBar){

  }
  categorias:any

  ngOnInit(): void {
  this.categoriaService.getAllCategorias().subscribe({
    next:data =>{
      this.categorias=data;
    },
    error: error=>{
      console.log(error);
        this.snack.open("Ha ocurrido un error al cargar las categorias!", 'aceptar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
    }
  })

  }


}

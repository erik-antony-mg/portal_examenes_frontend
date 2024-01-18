import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent implements OnInit {

  categorias:any

  constructor(private categoriaService:CategoriaService,
              private snack:MatSnackBar) { }

  ngOnInit(): void {
  this.categoriaService.getAllCategorias().subscribe({
    next:(data)=>{
        this.categorias=data;
    },
    error: err=>{
      this.snack.open("error al cargar las categorias"," ",{
        duration:3000
      })
      console.log(err);

    }
  })

  }


}

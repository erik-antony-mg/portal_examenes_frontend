import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ExamenService } from 'src/app/services/examen.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-examen',
  templateUrl: './add-examen.component.html',
  styleUrls: ['./add-examen.component.css']
})
export class AddExamenComponent implements OnInit {

  examen:any={
    titulo:"",
    descripcion:"",
    puntosMax:"",
    numPregun:"",
    enable:false,
    categoria:{
      categoriaId:""
    }
  }
  categorias:any=[]

  constructor(private examenService:ExamenService,
              private categoriaService:CategoriaService,
              private snack:MatSnackBar,
              private router:Router) {}
  ngOnInit(): void {


    this.categoriaService.getAllCategorias().subscribe({
      next:(response: any)=>{
        this.categorias=response;
        },
      error:erro=>{
        Swal.fire({
          icon: "error",
          title: "categoria",
          text: "error al cargar las categorias!",
        });
      }
    })
  }


  form(){

   this.examenService.createExamen(this.examen).subscribe({

    next:(response:any) =>{
      Swal.fire({
        icon: "success",
        title: "Examen guardado",
        text: "Examen  registrado con exito en el sistema !",
        showConfirmButton: false,
        timer: 1500
      })
        this.router.navigate(['admin/examenes']);
    },
    error: (err) => {
      Swal.fire({
        icon: "error",
        title: "Examen",
        text: "error al guardar el examen!",
      });
    }
   })
  }
}

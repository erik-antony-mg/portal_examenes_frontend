import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ExamenService } from 'src/app/services/examen.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-actualizar-examen',
  templateUrl: './actualizar-examen.component.html',
  styleUrls: ['./actualizar-examen.component.css']
})
export class ActualizarExamenComponent implements OnInit{

  constructor(private route:ActivatedRoute,
              private examenService:ExamenService,
              private categoriaService:CategoriaService,
              private router:Router){}
  examenId=0;
  examen:any;
  categorias:any

  ngOnInit(): void {
    this.examenId=this.route.snapshot.params["examenId"];

    this.examenService.getExamenById(this.examenId).subscribe({
      next:(response)=>{
      this.examen=response;
      },
      error:error=>{
        console.log(error);
      }
    })
    this.categoriaService.getAllCategorias().subscribe({
      next:(response) =>{
      this.categorias=response;
      },
      error:error=>{
        console.log(error);
      }
    })
  }

  actualizarExamen(){
     this.examenService.editExamen(this.examenId,this.examen).subscribe({
     next:data=>{
      Swal.fire({
        title: "Examen actualizado",
        text: "El examen fue actulizado con exito!!!",
        icon: "success",
        showConfirmButton: false,
        timer: 1500
      })
        .then(result=>{
          this.router.navigate(['admin/examenes'])
          });
     },
     error:erro=>{
      Swal.fire("Error!","Ocurrio un error al intentar eliminar el examen","error")
     }
     })

  }

}

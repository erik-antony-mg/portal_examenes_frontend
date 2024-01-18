import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PreguntaService } from 'src/app/services/pregunta.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-view-preguntas',
  templateUrl: './view-preguntas.component.html',
  styleUrls: ['./view-preguntas.component.css']
})
export class ViewPreguntasComponent implements OnInit{
  examenId:any
  titulo: any;
  preguntas:any=[]
  preguntaOpcion:any

  constructor(private route:ActivatedRoute,private preguntaService:PreguntaService){}

  ngOnInit(): void {
     this.examenId= this.route.snapshot.params['examenId'];
     this.titulo = this.route.snapshot.params['titulo']


    this.preguntaService.getPreguntaByExamenId(this.examenId).subscribe({
      next:(response:any)=>{
        this.preguntas=response;
      },
      error:error=>{
        console.log(error);

      }
    })

  }

  eliminarPregunta(preguntaId:any){
    Swal.fire({
      title: '¿Está seguro de eliminar la pregunta?',
      text: "No podrá revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
      showCloseButton: true
    }).then(resultado =>{
      if(resultado.isConfirmed){
          this.preguntaService.deletePregunta(preguntaId).subscribe({
           next:(response:any) =>{
            this.preguntas=this.preguntas.filter((pregunta:any)=> pregunta.preguntaId !=preguntaId);
            Swal.fire("Eliminado!","La pregunta ha sido eliminado correctamente","success");
           },
           error(err) {
            Swal.fire("Error!","Ocurrio un error al intentar eliminar la pregunta","error")
              }
           });
      }

    })

  }
}



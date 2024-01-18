import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PreguntaService } from 'src/app/services/pregunta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-pregunta',
  templateUrl: './actualizar-pregunta.component.html',
  styleUrls: ['./actualizar-pregunta.component.css']
})
export class ActualizarPreguntaComponent implements OnInit{

  constructor(private route:ActivatedRoute,private preguntaService:PreguntaService,private router:Router) { }

  pregunta:any;
  preguntaId:any;

  ngOnInit(): void {
    this.preguntaId=this.route.snapshot.params["preguntaId"];

     this.preguntaService.getPreguntaById(this.preguntaId).subscribe({
      next:(response:any)=>{
          this.pregunta=response

      },
      error:error=>{
        console.log(error);
        }
       })

  }

  actualizar(){
    this.preguntaService.updatePregunta(this.preguntaId,this.pregunta).subscribe({
      next:data=>{
          Swal.fire("pregunta actualizada","La pregunta fue actualizada con exito","success")
          .then(resp =>{
            if (resp.isConfirmed){
              this.router.navigate(['/admin/preguntas/'+this.pregunta.examen.examenId+'/'+this.pregunta.examen.titulo])
            }
          })
      },
      error:err=>{
        Swal.fire("Error al  actualizar la pregunta","La pregunta no fue actualizada ","error")
      }
    })
  }
}

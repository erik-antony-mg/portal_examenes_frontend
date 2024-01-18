import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { PreguntaService } from 'src/app/services/pregunta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-pregunta',
  templateUrl: './add-pregunta.component.html',
  styleUrls: ['./add-pregunta.component.css']
})
export class AddPreguntaComponent implements OnInit {

  pregunta:any={
    contenido:"",
    opcion1:"",
    opcion2:"",
    opcion3:"",
    opcion4:"",
    respuesta:"",
    examen:{
      examenId:""
    }
  }
  examenIdActual:any;
  examenTitulo:any
  constructor(private route:ActivatedRoute,
              private preguntaService:PreguntaService,
              private router:Router,
              private snack:MatSnackBar) {}

  ngOnInit(): void {
    this.examenIdActual=this.route.snapshot.params['examenId'];
    this.examenTitulo=this.route.snapshot.params['titulo'];
  }

  formSubmit(){

    if(this.pregunta.contenido.trim()==''|| this.pregunta.contenido ==null){
      this.snack.open('El contenido es requerido !!','Aceptar',{
        duration:3000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      })
      return;
    }
    if(this.pregunta.opcion1.trim()==''|| this.pregunta.opcion1 ==null){
      this.snack.open('La opcion 1 es requerida !!','Aceptar',{
        duration:3000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      })
      return;
    }
    if(this.pregunta.opcion2.trim()==''|| this.pregunta.opcion2 ==null){
      this.snack.open('La opcion 2 es requerida !!','Aceptar',{
        duration:3000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      })
      return;
    }
    if(this.pregunta.opcion3.trim()==''|| this.pregunta.opcion3 ==null){
      this.snack.open('La opcion 3 es requerida !!','Aceptar',{
        duration:3000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      })
      return;
    }
    if(this.pregunta.opcion4.trim()==''|| this.pregunta.opcion4 ==null){
      this.snack.open('La opcion 4 es requerida !!','Aceptar',{
        duration:3000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      })
      return;
    }
    if(this.pregunta.respuesta.trim()==''|| this.pregunta.respuesta ==null){
      this.snack.open('La respuesta  es requerida !!','Aceptar',{
        duration:3000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      })
      return;
    }


  this.pregunta.examen.examenId=this.examenIdActual;
    this.preguntaService.createPregunta(this.pregunta).subscribe({
      next:(response)=>{
        Swal.fire('pregunta guardada','La pregunta seguardo con exito','success');
          this.router.navigate([`/admin/preguntas/${this.examenIdActual}/${this.examenTitulo}`]);
      },
      error:error=>{
        console.log(error);

      }
    })
  }



}

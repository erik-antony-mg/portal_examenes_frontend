import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PreguntaService } from 'src/app/services/pregunta.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-comenzar-prueba',
  templateUrl: './comenzar-prueba.component.html',
  styleUrls: ['./comenzar-prueba.component.css']
})
export class ComenzarPruebaComponent implements OnInit{

  examenId:any;
  preguntas:any;
  puntosConseguidos=0;
  respuestasCorrectas=0;
  intentos=0;
  timer:any;

  esEnviado=false;

  constructor(private locationSt:LocationStrategy,private route:ActivatedRoute,private preguntasService:PreguntaService) { }

  ngOnInit(): void {

    this.examenId=this.route.snapshot.params["examenId"]
    this.noRetrosederLaPagina()
    this.cargarPreguntas()

    console.log(this.preguntas?.length * 2 * 60);
  }


  cargarPreguntas(){
    this.preguntasService.getPreguntaByExamenId(this.examenId).subscribe({
      next:(response)=>{
        this.preguntas=response ;
        this.timer=this.preguntas.length *2*60;
        this.preguntas.forEach((pregunta:any) => {
        pregunta['respuestaDada']='';
        });
          this.iniciarTemporizador()
      },
      error:err=>{
        Swal.fire("no hay preguntas","este examen no tiene preguntas","error")
      }
    })
  }

  enviarCuestionario(){
    Swal.fire({
      title: '¿Está seguro de enviar el examen?',
      text: "No podrá revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si , enviar!',
      showCloseButton: true
    }).then(resp=>{
      if (resp.isConfirmed){
        this.evaluarExamen();
      }
    });
  }

  iniciarTemporizador(){
    const temporizador=window.setInterval(()=>{
      if(this.timer<=0){
        this.evaluarExamen();
        clearInterval(temporizador)
      }else{
        this.timer --;
      }
    },1000)
  }

    obtenerHoraFormateada(){
      const minutos = Math.floor(this.timer / 60);
      const segundos = this.timer - minutos* 60;
      return `${minutos} : min : ${segundos} seg`;
    }


  noRetrosederLaPagina(){
    // history.pushState(null,null!,location.href);
    // this.locationSt.onPopState(()=>{
    //   history.pushState(null,null!,location.href);
    // })

    const evitarRetroceso = () => history.pushState(null, '', location.href);
      evitarRetroceso(); // Llamamos a la función al inicio para establecer la entrada inicial
      // Registramos el listener para el evento popstate
      this.locationSt.onPopState(evitarRetroceso);
  }

  evaluarExamen(){

    //   this.esEnviado =true;
    //   this.preguntas.forEach((pregunta:any) => {

    //       if(  pregunta.respuestaDada===pregunta.respuesta){
    //         this.respuestasCorrectas++;
    //         let puntos=this.preguntas[0].examen.puntosMax/this.preguntas.length;
    //         this.puntosConseguidos+=puntos;
    //       }
    //       if(pregunta.respuestaDada.trim()!=''){
    //         this.intentos++;
    //       }

    //   });


    // console.log(this.respuestasCorrectas);
    // console.log(this.puntosConseguidos);
    // console.log(this.intentos);
    this.preguntasService.evalularExamen(this.preguntas).subscribe({
      next:(resp: any)=>{
      console.log(resp);
      this.puntosConseguidos=resp.puntosMaximos;
      this.respuestasCorrectas=resp.respuestasCorrectas;
      this.intentos=resp.intetos;
      this.esEnviado=true
      },
      error:err =>{
        console.log(err);

      }
    })


  }

  imprimirPagina(){
    window.print();
  }

}

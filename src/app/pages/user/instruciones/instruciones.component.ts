import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamenService } from 'src/app/services/examen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instruciones',
  templateUrl: './instruciones.component.html',
  styleUrls: ['./instruciones.component.css']
})
export class InstrucionesComponent implements OnInit{

  examenId:any
  examen:any

  constructor(private route:ActivatedRoute,private examenService:ExamenService,private router:Router){}
  ngOnInit(): void {
    this.examenId=this.route.snapshot.params["examenId"]
    this.examenService.getExamenById(this.examenId).subscribe({
      next:(response:any)=>{
          this.examen=response;
      },
      error:err=>{
        console.log(err);

      }
    })
  }

  empezarExamen(){
    Swal.fire({
      title:"¿Quiere comenzar el examen?",
      showCancelButton:true,
      cancelButtonText:"cancelar",
      confirmButtonText:"empezar",
      icon:"info"
    }).then(result =>{
      if (result.isConfirmed) {
        this.router.navigate(['/start/'+this.examenId]);
      }
    })
  }

}

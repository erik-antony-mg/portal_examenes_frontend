import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExamenService } from 'src/app/services/examen.service';

@Component({
  selector: 'app-load-examen',
  templateUrl: './load-examen.component.html',
  styleUrls: ['./load-examen.component.css']
})
export class LoadExamenComponent implements OnInit {

  examenes:any
  categoriaId:any
  constructor(private exameneService:ExamenService,
              private route:ActivatedRoute){}

  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      this.categoriaId=this.route.snapshot.params["categoriaId"];

     if(this.categoriaId == 0){
      this.exameneService.gettAllExamensActivos().subscribe({
          next:(response)=>{
            this.examenes=response;
          },
          error:err=>{
            console.log(err);
          }
          });
     }else{
      this.exameneService.getAllExamensActivosDeUnaCategoria(this.categoriaId).subscribe({
        next:(resp) =>{
            this.examenes=resp;
        },
        error:err=>{
            console.log(err);
        }
      })

     }
    })


  }

}

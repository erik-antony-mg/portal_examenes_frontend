import { Component, OnInit } from '@angular/core';
import { ExamenService } from 'src/app/services/examen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-examenes',
  templateUrl: './view-examenes.component.html',
  styleUrls: ['./view-examenes.component.css']
})
export class ViewExamenesComponent implements OnInit{

  constructor(private examenservice:ExamenService ){}

  examenes:any

  ngOnInit(): void {
    this.examenservice.getAllExamenes().subscribe({
      next: (data:any) => {
      this.examenes=data;
      }
    })

  }

  eliminarExamen(examenid:any){
    Swal.fire({
      title: "Estas Seguro de eliminar el examen ",
      icon: "warning",
      confirmButtonText: "aceptar",
      cancelButtonText: "rechazar",
      confirmButtonColor:"#3085d6",
      cancelButtonColor:"#d33",
      showCancelButton: true,
      showCloseButton: true
    }).then(result =>{
      if (result.isConfirmed) {

         this.examenservice.deleteExamen(examenid).subscribe({
           next:(datos)=>{
             this.examenes=this.examenes.filter((examen:any)=> examen.examenId !=examenid);
             Swal.fire("Eliminado!","El examen ha sido eliminado correctamente","success");
           },
           error(err) {
               Swal.fire("Error!","Ocurrio un error al intentar eliminar el examen","error")
           }
         });
      }
    })
  }


}

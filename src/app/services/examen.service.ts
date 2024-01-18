import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExamenService {

  constructor(private http:HttpClient) { }

  getAllExamenes(){
    return this.http.get(`${environment.apiBase}/examen`);
  }
  createExamen(data:any):Observable<any>{
    return this.http.post<any>(`${environment.apiBase}/examen/create`,data)
  }
  deleteExamen(idExamen:any){
    return this.http.delete(`${environment.apiBase}/examen/delete/${idExamen}`)
  }

  getExamenById(examenId:any){
    return this.http.get(`${environment.apiBase}/examen/${examenId}`);
  }
  editExamen(examenId:any,data:any){
    return this.http.put(`${environment.apiBase}/examen/edit/${examenId}`,data)
  }
  getAllExamnsByCategoriId(categoriaId:any){
    return this.http.get(`${environment.apiBase}/examen/categoria/${categoriaId}`)
  }
  gettAllExamensActivos(){
    return this.http.get(`${environment.apiBase}/examen/activos`)
  }
  getAllExamensActivosDeUnaCategoria(categoriaId:any){
    return this.http.get(`${environment.apiBase}/examen/categoria/activos/${categoriaId}`)
  }
}


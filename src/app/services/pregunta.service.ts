import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PreguntaService {

  constructor(private http:HttpClient) { }

  getAllPreguntas(){
    return this.http.get(`${environment.apiBase}/pregunta`);
  }
  getPreguntaByExamenId(examenId:any){
    return this.http.get(`${environment.apiBase}/pregunta/examen/${examenId}`)
  }
  createPregunta(data:any):Observable<any>{
    return this.http.post<any>(`${environment.apiBase}/pregunta/create`,data)
  }
  deletePregunta(idPregunta:any){
    return this.http.delete(`${environment.apiBase}/pregunta/delete/${idPregunta}`)
  }
  updatePregunta(idPregunta:any, data: any):Observable<any>{
    return this.http.put(`${environment.apiBase}/pregunta/edit/${idPregunta}`,data);
  }
  getPreguntaById(preguntaId:any){
    return this.http.get(`${environment.apiBase}/pregunta/${preguntaId}`)
  }
  evalularExamen(preguntas:any){
    return this.http.post(`${environment.apiBase}/pregunta/examen-evaluado`,preguntas);
  }

}

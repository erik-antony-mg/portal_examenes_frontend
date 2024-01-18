import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from 'src/shared/Usuario';
import { UsuarioCompleto } from 'src/shared/UsuarioCompleto';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  public registrarUsuario(user:Usuario):Observable<Usuario>{
    return this.http.post<Usuario>(`${environment.apiBase}/usuarios/create`,user);
  }

  public obtenerUsuario(username:string):Observable<UsuarioCompleto>{
    return this.http.get<UsuarioCompleto>(`${environment.apiBase}/usuarios/${username}`)
  }
  obtenerUsuarioById(id: string): Observable<any> {
    return this.http.get<any>(`${environment.apiBase}/usuarios/${id}`)
  }

  public getAllUser():Observable<any>{
    return this.http.get<any>(`${environment.apiBase}/usuarios`)
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject, map } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubjec= new Subject<boolean>();

  constructor(private http:HttpClient) { }

   login(creds:any){
      return this.http.post<any>(`${environment.apiLogin}/login`, creds,{
      observe :'response'
      })
        .pipe(map((response:HttpResponse<any>)=>{
        const body=response.body
        const headers = response.headers;

        const bearertoken = response.headers.get('Authorization')!;
        const token = bearertoken?.replace('Bearer ','');
        const tokenData:any= jwtDecode(token);
        const expiresAt = new Date(1970, 0, 1); // Inicializa con la época (1970-01-01)
        expiresAt.setSeconds(expiresAt.getSeconds() + tokenData.exp);

        localStorage.setItem("portalExamen_username",tokenData.sub);
        localStorage.setItem("portalExamen_roles",JSON.stringify(tokenData.roles));
        localStorage.setItem("portalExamen_token",token);
        localStorage.setItem("portalExamen_expires_at",JSON.stringify(expiresAt).valueOf());
        return body;
    }))

  }

  getName(){
    return localStorage.getItem('portalExamen_username') || '';
  }
  getToken(){
  return localStorage.getItem("portalExamen_token");
  }
  isAdmin(){
    let roles: String[] = JSON.parse(localStorage.getItem("portalExamen_roles") || '[]');
    return  roles.includes("ADMIN");
  }
  isUser(){
    let roles: String[] = JSON.parse(localStorage.getItem("portalExamen_roles") || '[]');
    return  roles.includes("USER");
  }
  isInvitado(){
    let roles: String[] = JSON.parse(localStorage.getItem("portalExamen_roles") || '[]');

    return roles.includes("INVITADO");
  }
  isLoggedIn(){
    const expiredAt= localStorage.getItem("portalExamen_expires_at");

    if (expiredAt) {
      const expirationDate = new Date(JSON.parse(expiredAt));
      // Compara la fecha actual con la fecha de expiración
      return new Date() < expirationDate;
    }
    return false;
  }

  logout(){
    localStorage.removeItem("portalExamen_username");
    localStorage.removeItem("portalExamen_roles");
    localStorage.removeItem("portalExamen_token");
    localStorage.removeItem("portalExamen_expires_at");
  }


//--------------------------------------------------------------
//obtener respuesta del back


  // public getUserRole(){
  //   let username= this.getUsernameOfLocalStorage();
  //   return username.authorities[0].authority;

  // }


}

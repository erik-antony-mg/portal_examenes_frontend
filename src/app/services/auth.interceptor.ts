import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from './login.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private loginService: LoginService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = this.loginService.getToken();
    if (token) {
      const cloned = request.clone(
        { headers: request.headers.set('Authorization', `Bearer ${token}`) }
      );
      return next.handle(cloned);
    }

    return next.handle(request);
  }
}




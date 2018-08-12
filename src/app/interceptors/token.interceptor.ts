
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(this.userService.getToken()) {
      const Authorization = `Bearer ${this.userService.getToken()}`; 

      request = request.clone({
        setHeaders: { Authorization }
      });
    }

    return next.handle(request);
  }
}

import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import {
  HttpRequest, HttpResponse, HttpHandler,
  HttpEvent, HttpInterceptor
} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {
  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((event) => {}, 
          (error) => {
            if(error.status === 401) {
              localStorage.removeItem('user');
              this.userService.tokenChanged.next();
              this.router.navigate(['/login']);
            }
          })
    );
  }
}
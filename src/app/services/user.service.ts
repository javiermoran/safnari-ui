import { Http, Response } from "@angular/http";
import { User } from '../models/user.model';
import { Injectable } from "@angular/core";
import { environment } from '../../environments/environment';
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class UserService {
  private API_URI = `${environment.apiUrl}/users`;
  private user;
  tokenChanged = new Subject<{}>();

  constructor(
    private http: Http, 
    private router: Router,
    private httpClient: HttpClient
  ) {}

  registerUser(user: User) {
    return this.http.post(`${this.API_URI}/`, user);
  }

  login(email: String, password: String) {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.API_URI}/token`, { email, password})
        .subscribe((response: Response) => {
          this.user = {
            email,
            token: response.json().token
          };
          localStorage.setItem('user', JSON.stringify(this.user));
          this.tokenChanged.next(this.user);
          resolve(this.user);
        }, (e) => {
          reject(e);
        });
    });
  }

  getToken() {
    if(!!JSON.parse(localStorage.getItem('user'))) {
      return JSON.parse(localStorage.getItem('user')).token;
    } else {
      return null;
    }
  }

  isLoggedIn() {
    return !!JSON.parse(localStorage.getItem('user'));
  }

  getMe() {
    return this.httpClient.get(`${this.API_URI}/me`);
  }

  logout() {
    return new Promise((resolve, reject) => {
      this.httpClient.delete(`${this.API_URI}/token`)
        .subscribe((response) => {
          resolve(response);
          localStorage.removeItem('user');
          this.tokenChanged.next(null);
        }, (error) => {
          reject(error);
        })
    });
  }

  parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }
}

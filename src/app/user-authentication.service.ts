import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
const apiUrl = 'http://localhost:8000/users';

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticationService {

  constructor(private http: HttpClient) { }

  login (data) {
    const res = this.http.post(apiUrl+"/login", data)
    return this.setSession(res);
  }

  setSession(auth) {
    auth.subscribe(res => {
      localStorage.setItem('id_token', res.token);
      if (res.user.admin) {
        localStorage.setItem('privilege', 'admin');
      } else {
        localStorage.setItem('privilege', 'user');
      }
      return res;
    }, err => {
      console.log(err);
    })
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('privilege');
  }

  public isLoggedIn() {
    let id = localStorage.getItem('id_token');
    if (id) {
      return true;
    }
    return false;
  }

  public isLoggedOut() {
    return !this.isLoggedIn();
  }


}

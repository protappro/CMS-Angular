import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  
  constructor(
    private httpClient: HttpClient
  ) { }

  login(data: any) {
    return this.httpClient.post<any>(environment.baseApiUrl + '/login', data);
  }
  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_info');
    localStorage.clear();
    return true;
  }

  isAuthenticated(): boolean{
    if (localStorage.getItem('user_info')){
      return true;
    }
    else{
      return false;
    }
  }

}

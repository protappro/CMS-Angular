import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpHeaderOptions: any;
  constructor(private http: HttpClient) {
    this.httpHeaderOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Token',
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    }
  }

  createUser(data: any): Observable<any> {
    return this.http.post(environment.baseApiUrl + '/save-user', data);
  }

  getUser(data: any): Observable<any> {
    return this.http.post(environment.baseApiUrl + '/user-details', data);
  }

  updateUserProfile(data: any): Observable<any> {
    return this.http.post(environment.baseApiUrl + '/designer-update', data);
  }

  updateUserPassword(data: any): Observable<any> {
    return this.http.post(environment.baseApiUrl + '/password-update', data);
  }

  sendPasswordLink(data: any): Observable<any> {
    return this.http.post(environment.baseApiUrl + '/send-password-link', data)
  }
  
  resetPassword(data: any): Observable<any> {
    return this.http.post(environment.baseApiUrl + '/reset-password', data)
  }
}

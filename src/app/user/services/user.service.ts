import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiHost: string = 'http://localhost:5000/';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  register(user: any): Observable<any> {
    return this.http.post<any>(this.apiHost + 'api/public/auth/register/patient', user, {headers: this.headers});
  }
  activate(code: string): Observable<any> {
    return this.http.patch<any>(this.apiHost + 'api/public/auth/activate/' + code, {headers: this.headers});
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../model/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiHost: string = 'http://localhost:5000/';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

    register(user: IUser): Observable<any>
    {
        return this.http.post<any>(this.apiHost + 'api/public/auth/register/patient', user, {headers: this.headers});
    }
    
    validateUid(uid: any): Observable<any>
    {
        return this.http.get<any>(this.apiHost + 'api/public/user/validate/uid/' + uid, {headers: this.headers});
    }

    validateUsername(username: any): Observable<any>
    {
        return this.http.get<any>(this.apiHost + 'api/public/user/validate/username/' + username, {headers: this.headers});
    }

    validateEmail(email: any): Observable<any>
    {
        return this.http.get<any>(this.apiHost + 'api/public/user/validate/email/' + email, {headers: this.headers});
    }

    activate(code: string): Observable<any>
    {
        return this.http.patch<any>(this.apiHost + 'api/public/auth/activate/' + code, {headers: this.headers});
    }
}

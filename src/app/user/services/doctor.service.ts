import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
    apiHost: string = 'http://localhost:5000/';
    headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(private http: HttpClient) { }
    getDoctors(): Observable<any> {
        return this.http.get<any>(this.apiHost + 'api/public/doctors/internal-medicine/registration', {headers: this.headers});
    }
}

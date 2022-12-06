import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

    apiHost: string = 'http://localhost:5000/';
    headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    constructor(private http: HttpClient) { }
    GetTimeIntervals(doctorUid:string,chosen: Date): Observable<any>
    {
        return this.http.get<any>(this.apiHost + 'api/public/appointments/time-intervals/step-by-step/'+doctorUid+"/"+chosen.toISOString(), {headers: this.headers});
    }
}

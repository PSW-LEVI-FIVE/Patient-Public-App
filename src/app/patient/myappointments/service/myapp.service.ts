import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IExam } from '../model/exam.model';
import { IAppointment } from '../model/myappointments.model';

@Injectable({
  providedIn: 'root'
})
export class MyappService {

  apiHost: string = 'http://localhost:5000/';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }

  
  getAllAppointments(): Observable<IAppointment[]> {
    return this.http.get<IAppointment[]>(this.apiHost + 'api/public/appointments/myAppointments', {headers: this.headers});
  }

  cancelAppointment(id : number): Observable<IAppointment[]> {
    return this.http.post<IAppointment[]>(this.apiHost + 'api/public/appointments/cancel',id, {headers: this.headers});
  }

  showPdf(appointmentId : number): Observable<IExam> {
    return this.http.post<IExam>(this.apiHost + 'api/public/appointments/pdf',appointmentId, {headers: this.headers});
  }
  getAllFinishedAppointments(): Observable<IAppointment[]> {
    return this.http.get<IAppointment[]>(this.apiHost + 'api/public/appointments/finished', {headers: this.headers});
  }
}

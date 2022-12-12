import { ITimeInterval } from './../model/ITimeInterval';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICreateAppointmentForPatient } from '../model/ICreateAppointment';
import { Observable } from 'rxjs';
import { ITimeIntervalWithDoctor } from '../model/ITimeIntervalWithDoctor';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

    apiHost: string = 'http://localhost:5000/api/public';
    headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    constructor(private http: HttpClient) { }
    GetTimeIntervalsStepByStep(doctorUid:string,chosen: Date): Observable<ITimeInterval[]>
    {
        return this.http.get<ITimeInterval[]>(this.apiHost + '/appointments/time-intervals/step-by-step/'+doctorUid+"/"+chosen.toISOString(), {headers: this.headers});
    }
    GetTimeIntervalsRecommendation(doctorUid:string,start: Date,end: Date): Observable<ITimeIntervalWithDoctor[]>
    {
        return this.http.get<ITimeIntervalWithDoctor[]>(this.apiHost + '/appointments/time-intervals/recommended/'+doctorUid+"/"+start.toISOString()+"/"+end.toISOString(), {headers: this.headers});
    }
    GetTimeIntervalsRecommendationDatePriority(speciality:string,start: Date,end: Date): Observable<ITimeIntervalWithDoctor[]>
    {
        return this.http.get<ITimeIntervalWithDoctor[]>(this.apiHost + '/appointments/time-intervals/recommended/date-priority/'+speciality+"/"+start.toISOString()+"/"+end.toISOString(), {headers: this.headers});
    }
    CreateAppointment(appointment:ICreateAppointmentForPatient): Observable<any>
    {
        return this.http.post<any>(this.apiHost + '/appointments',appointment, {headers: this.headers});
    }
}

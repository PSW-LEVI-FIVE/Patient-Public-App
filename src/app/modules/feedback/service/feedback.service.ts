import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFeedback } from '../model/feedback.model';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  apiHost: string = 'http://localhost:5000/';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }

  createFeedback(feedback: any): Observable<any> {
    console.log(feedback.Anonimity);
    return this.http.post<any>(this.apiHost + 'api/public/feedbacks', feedback, {headers: this.headers});
  }
  getPublishedFeedbacks(): Observable<IFeedback[]> {
    return this.http.get<IFeedback[]>(this.apiHost + 'api/public/feedbacks/published', {headers: this.headers});
  }
}

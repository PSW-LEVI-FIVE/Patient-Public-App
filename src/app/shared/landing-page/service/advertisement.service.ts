import { IAdvertisement } from './../model/advertisement.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {

    apiHost: string = 'http://localhost:5000/';
    headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    constructor(private http: HttpClient) { }

    getAll(): Observable<IAdvertisement[]> {
        return this.http.get<IAdvertisement[]>(this.apiHost + 'api/public/advertisement/all', {headers: this.headers});
    }
}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Authenticated } from '../model/authenticated.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataSubject = new Subject<Authenticated>();

  profile$ = this.dataSubject.asObservable();

  updateData(profile: Authenticated) {
    this.dataSubject.next(profile);
  }
}
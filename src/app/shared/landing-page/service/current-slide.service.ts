import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentSlideService {
    private dataSubject = new Subject<number>();

    currentSlide$ = this.dataSubject.asObservable();
  
    updateData(currentSlide: number) {
        this.dataSubject.next(currentSlide);
    }
}

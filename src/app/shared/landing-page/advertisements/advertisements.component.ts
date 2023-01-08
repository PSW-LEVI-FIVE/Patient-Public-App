import { CurrentSlideService } from './../service/current-slide.service';

import { IAdvertisement } from './../model/advertisement.model';
import { Component, OnInit } from '@angular/core';
import { AdvertisementService } from '../service/advertisement.service';
import { SlideAnimations } from './SlideAnimations';
import { interval } from 'rxjs';
@Component({
  selector: 'app-advertisements',
  templateUrl: './advertisements.component.html',
  styleUrls: ['./advertisements.component.css'],
  animations: [SlideAnimations]
})
export class AdvertisementsComponent implements OnInit {
    public advertisements: IAdvertisement[] = [];
    public currentSlide:number = 0;
    public storageUrl:string =  "https://pdphmpovyeiqspzsxqzq.supabase.co/storage/v1/object/public/photos/";
    constructor(
        private readonly advertisementService: AdvertisementService,
        private readonly currentSlideService: CurrentSlideService,
        ) { }

    ngOnInit(): void { 
        this.advertisementService.getAll().subscribe(res => {
            this.advertisements = res;
          this.advertisements.forEach((advertisement)=>{
            advertisement.pictureUrl = this.storageUrl + advertisement.pictureUrl;
          })
          interval(10000).subscribe(x => {
            this.onNextClick();
        });
        })
      }
    
      onPreviousClick() {
        const previous = this.currentSlide - 1;
        this.currentSlide = previous < 0 ? this.advertisements.length - 1 : previous;
        this.currentSlideService.updateData(this.currentSlide);
      }
    
      onNextClick() {
        const next = this.currentSlide + 1;
        this.currentSlide = next === this.advertisements.length ? 0 : next;
        this.currentSlideService.updateData(this.currentSlide);
      }
}

import { CurrentSlideService } from './../../service/current-slide.service';
import { Component, Input, OnInit } from '@angular/core';
import { SlideAnimations } from '../SlideAnimations';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css'],
  animations: [SlideAnimations]
})
export class SlideComponent implements OnInit {

    @Input()
    index!: number;
    @Input()
    imageUrl!: string;
    @Input()
    title!: string;
    @Input()
    text!: string;

    clicked!: boolean;
    currentSlide:number = 0;
    previousSlide:number = 0;
    animationState: string = "center";

    constructor(private surrentSlideService:CurrentSlideService) {
        this.clicked = false;
        this.surrentSlideService.currentSlide$.subscribe(currentSlide => {
            this.previousSlide = this.currentSlide;
            this.currentSlide = currentSlide;
            if(this.currentSlide == this.index)
                this.animationState = 'center';
            else if(this.currentSlide > this.index)
                this.animationState = 'left';
            else
                this.animationState = 'right';
          });
     }
    adClicked(){
        this.clicked = !this.clicked;
    }
    resetClick($event: any){
        this.clicked = false;
    }

    ngOnInit(): void {
    }

}

import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { IFeedback } from 'src/app/patient/feedback/model/feedback.model';
import { FeedbackService } from 'src/app/patient/feedback/service/feedback.service';

@Component({
  selector: 'app-card-carousel',
  templateUrl: './card-carousel.component.html',
  styleUrls: ['./card-carousel.component.css']
})
export class CardCarouselComponent implements OnInit {

  arr: IFeedback[] = []
  totalCards: number = this.arr.length;
  currentPage: number = 1;
  pagePosition: string = "0%";
  cardsPerPage: number = -1;
  totalPages: number = -1;
  overflowWidth: string = "";
  cardWidth: string = "";
  containerWidth: number = -1;
  @ViewChild("container", { static: true, read: ElementRef })
  container: ElementRef | null = null;
  @HostListener("window:resize") windowResize() {
    let newCardsPerPage = this.getCardsPerPage();
    if (newCardsPerPage != this.cardsPerPage) {
      this.cardsPerPage = newCardsPerPage;
      this.initializeSlider();
      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages;
        this.populatePagePosition();
      }
    }
  }

  constructor(private readonly feedbackService: FeedbackService) { }

  ngOnInit() {
    this.feedbackService.getPublishedFeedbacks().subscribe(res => {
      this.arr = res;
      this.totalCards = res.length
      this.cardsPerPage = this.getCardsPerPage();
      this.initializeSlider();
    })
  }

  initializeSlider() {
    this.totalPages = Math.ceil(this.totalCards / this.cardsPerPage);
    this.overflowWidth = `calc(${this.totalPages * 100}%`;
    this.cardWidth = `calc((${100 / this.totalPages}% - ${this.cardsPerPage *
      10}px) / ${this.cardsPerPage})`;
  }

  getCardsPerPage() {
    return 3;
    return Math.floor(this.container?.nativeElement.offsetWidth / 200);
  }

  changePage(incrementor: number) {
    this.currentPage += incrementor;
    this.populatePagePosition();
  }

  populatePagePosition() {
    this.pagePosition = `calc(${-100 * (this.currentPage - 1)}% - ${10 *
      (this.currentPage - 1)}px)`;
  }

}

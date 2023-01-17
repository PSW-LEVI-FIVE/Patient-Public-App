import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IFeedback } from 'src/app/patient/feedback/model/feedback.model';
import { FeedbackService } from 'src/app/patient/feedback/service/feedback.service';
import { LoginService } from '../login/service/login.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css',
    './landing-page-why-us.component.css',
    './landing-page-feedback.component.css',
    './landing-page-ads.component.css',
    './landing-page-footer.component.css'
  ]
})
export class LandingPageComponent implements OnInit {

  navMoved: boolean = false;
  feedbacks: IFeedback[] = []
  totalCards: number = this.feedbacks.length;
  currentPage: number = 1;
  pagePosition: string = "0%";
  cardsPerPage: number = 3;
  totalPages: number = -1;
  overflowWidth: string = "";
  cardWidth: string = "";
  containerWidth: number = -1;

  constructor(
    private service: LoginService,
    private readonly feedbackService: FeedbackService,
    private readonly router: Router
  ) { }

  ngOnInit() {
    this.feedbackService.getPublishedFeedbacks().subscribe(res => {
      this.feedbacks = res
      this.totalCards = res.length
      this.initializeSlider()
    })
  }
  @HostListener('window:scroll', ['$event'])
  onScroll(e: any) {
    if (window.pageYOffset > 0)
      this.navMoved = true
    else
      this.navMoved = false
  }

  initializeSlider() {
    this.totalPages = Math.ceil(this.totalCards / this.cardsPerPage);
    this.overflowWidth = `${this.totalPages * 100}%`;
    this.cardWidth = `${100 / (this.totalPages * 3)}`;
  }

  changePage(incrementor: number) {
    console.log('right')
    this.currentPage += incrementor;
    this.populatePagePosition();
  }

  populatePagePosition() {

    const movement = Math.ceil(100 / this.totalPages)
    this.pagePosition = `-${movement * (this.currentPage - 1)}%`;
  }

  goTo(route: string) {
    this.router.navigate([route])
  }

}

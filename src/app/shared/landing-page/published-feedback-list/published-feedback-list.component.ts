import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IFeedback } from '../../../patient/feedback/model/feedback.model';
import { FeedbackService } from '../../../patient/feedback/service/feedback.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-published-feedback-list',
  templateUrl: './published-feedback-list.component.html',
  styleUrls: ['./published-feedback-list.component.css']
})
export class PublishedFeedbackListComponent implements OnInit {
  constructor(private feedbackService: FeedbackService, private router: Router) { }
  public dataSource = new MatTableDataSource<IFeedback>();
  public displayedColumns = ['Patient', 'Feedback Content'];
  public feedbacks: IFeedback[] = [];

  ngOnInit(): void {
    this.feedbackService.getPublishedFeedbacks().subscribe(res => {
      this.feedbacks = res;
      this.dataSource.data = this.feedbacks.sort((a, b) => 0.5 - Math.random());
    })
  }

}

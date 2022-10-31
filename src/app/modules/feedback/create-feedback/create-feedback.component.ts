import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IFeedback} from 'src/app/modules/feedback/model/feedback.model';
import { FeedbackService } from 'src/app/modules/feedback/service/feedback.service';

@Component({
  selector: 'app-create-feedback',
  templateUrl: './create-feedback.component.html',
  styleUrls: ['./create-feedback.component.css']
})
export class CreateFeedbackComponent implements OnInit {

  constructor(private feedbackService: FeedbackService, private router: Router) { }

  public feedback : IFeedback = {} as IFeedback
  public ForbidPublishment : boolean = false;

  ngOnInit(): void {
  }

  public createFeedback() {
    if (!this.isValidInput()) return;
    this.feedback.id = 0;
    this.feedback.patientId = 4;
    this.feedback.anonymity = false;
    this.feedback.published = false;
    this.feedback.allowPublishment = !this.ForbidPublishment;
    this.feedbackService.createFeedback(this.feedback).subscribe(res => {
      this.router.navigate(['/']);
    });
  }

  private isValidInput(): boolean {
    if(this.feedback.feedbackContent == '') alert("Please enter your feedback before submiting!"); 
    return this.feedback.feedbackContent != '';
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IFeedback} from 'src/app/modules/feedback/model/feedback.model';
import { FeedbackStatus} from 'src/app/modules/feedback/model/feedbackStatusEnum.model';
import { FeedbackService } from 'src/app/modules/feedback/service/feedback.service';

@Component({
  selector: 'app-create-feedback',
  templateUrl: './create-feedback.component.html',
  styleUrls: ['./create-feedback.component.css']
})
export class CreateFeedbackComponent implements OnInit {

  constructor(private feedbackService: FeedbackService, private router: Router) { }

  public patientId : number = 0;
  public privateFlag : boolean = false;
  private feedbackStatus : FeedbackStatus = FeedbackStatus.Public;
  public feedback : IFeedback = {} as IFeedback


  ngOnInit(): void {
  }

  public createFeedback() {
    if (!this.isValidInput()) return;
    
    this.feedback.publishment = false;            
    
    if(this.privateFlag){
      this.feedbackStatus = FeedbackStatus.Private
    }

    this.feedback.id = 0;
    this.feedback.feedbackStatus = this.feedbackStatus;

    this.feedbackService.createFeedback(this.feedback).subscribe(res => {
      this.router.navigate(['/']);
    });
  }

  private isValidInput(): boolean {
    if(this.feedback.feedbackContent == '') alert("Please enter your feedback before submiting!"); 
    return this.feedback.feedbackContent != '';
  }

}

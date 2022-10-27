import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IFeedback } from 'src/app/modules/feedback/model/feedback.model';
import { FeedbackService } from 'src/app/modules/feedback/service/feedback.service';

@Component({
  selector: 'app-create-feedback',
  templateUrl: './create-feedback.component.html',
  styleUrls: ['./create-feedback.component.css']
})
export class CreateFeedbackComponent implements OnInit {

  constructor(private feedbackService: FeedbackService, private router: Router) { }

  public patientId : number = 0;
  public feedbackContent : string = "";
  public privateFlag : boolean = false;
  private privateFlagInt : number = 1;

  ngOnInit(): void {
  }

  public createFeedback() {
    if (!this.isValidInput()) return;

                
    if(this.privateFlag){
      this.privateFlagInt = 0
    }else{
      this.privateFlagInt = 1
    }

    const feedback : IFeedback = {id:0,patientId : this.patientId, feedbackContent : this.feedbackContent, feedbackStatus:this.privateFlagInt}
    this.feedbackService.createFeedback(feedback).subscribe(res => {
      this.router.navigate(['/']);
    });
  }

  private isValidInput(): boolean {
    if(this.feedbackContent == '') alert("Please enter your feedback before submiting!"); 
    return this.feedbackContent != '';
  }

}

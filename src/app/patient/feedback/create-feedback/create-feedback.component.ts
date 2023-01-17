import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IFeedback, IFeedbackStatus } from '../model/feedback.model';
import { FeedbackService } from '../service/feedback.service';

@Component({
  selector: 'app-create-feedback',
  templateUrl: './create-feedback.component.html',
  styleUrls: ['./create-feedback.component.css']
})
export class CreateFeedbackComponent implements OnInit {

  constructor(private feedbackService: FeedbackService, private router: Router,
    private readonly toastService: ToastrService) { 
    this.feedback.id = 0;
    this.feedback.patientId = 0;
    this.feedback.feedbackContent = "";
    this.feedback.feedbackStatus = <IFeedbackStatus>{}
    this.feedback.feedbackStatus.anonimity = false;
    this.feedback.feedbackStatus.allowPublishment = false;
    this.feedback.feedbackStatus.published = false;
  }

  public feedback:IFeedback = <IFeedback>{};
  public errorMessage:string = "";
  isLoading: boolean = false;

  ngOnInit(): void {
  }

  public createFeedback() {
    this.isLoading = true;
    this.feedbackService.createFeedback(this.feedback).subscribe(res => {
        this.toastService.success("Your feedback recorded!")
        this.isLoading = false;
        this.router.navigate(['/patient/myAppointments']);
    });
  }
}

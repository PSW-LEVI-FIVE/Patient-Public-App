import { AppointmentModule } from './appointment/appointment.module';
import { FeedbackModule } from './feedback/feedback.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PatientComponent } from './patient.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { CreateFeedbackComponent } from './feedback/create-feedback/create-feedback.component';
import { AuthGuard } from '../shared/login/model/auth.guard';
import { AppointmentComponent } from './appointment/appointment.component';
import { StepByStepComponent } from './appointment/step-by-step/step-by-step.component';


const routes: Routes = [
  {
    path: 'patient',
    component: PatientComponent,
    canActivate:[AuthGuard],
    children: [
      {
        path: 'feedback',
        component: FeedbackComponent,
        children: [
          {
            path: 'create',
            component: CreateFeedbackComponent,
          },
        ],      
      },
      {
        path: 'appointment',
        component: AppointmentComponent,
        children: [
          {
            path: 'step-by-step',
            component: StepByStepComponent,
          },
        ],      
      },
    ]

  }

]

@NgModule({
  declarations: [
    PatientComponent
  ],
  imports: [
    CommonModule,
    FeedbackModule,
    AppointmentModule,
    RouterModule.forChild(routes)
  ]
})
export class PatientModule { }

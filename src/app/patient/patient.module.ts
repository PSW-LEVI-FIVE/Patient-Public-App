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
import { RecommendationScheduleComponent } from './appointment/recommendation-schedule/recommendation-schedule.component';
import { MyappointmentsComponent } from './myappointments/myappointments.component';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from '../material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { FinishedAppointmentsComponent } from './finished-appointments/finished-appointments.component';
import { SharedModule } from "../shared/shared.module";

const routes: Routes = [
  {
    path: 'patient',
    component: PatientComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'feedback/create',
        component: CreateFeedbackComponent,
      },
      {
        path: 'appointment',
        component: AppointmentComponent,
        children: [
          {
            path: 'step-by-step',
            component: StepByStepComponent,
          },
          {
            path: 'recommendation-scheduling',
            component: RecommendationScheduleComponent,
          },
        ],
      },
      {
        path: 'myAppointments',
        component: MyappointmentsComponent,
      },
      {
        path: 'finished',
        component: FinishedAppointmentsComponent,
      },
    ]

  }

]

@NgModule({
  declarations: [
    PatientComponent,
    MyappointmentsComponent,
    FinishedAppointmentsComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FeedbackModule,
    MaterialModule,
    AppointmentModule,
    MatTableModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class PatientModule { }

import { FeedbackModule } from './feedback/feedback.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PatientComponent } from './patient.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { CreateFeedbackComponent } from './feedback/create-feedback/create-feedback.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from '../shared/login/model/auth.guard';


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
        ]
      },
    ]

  }

]

@NgModule({
  declarations: [
    PatientComponent,
  ],
  imports: [
    CommonModule,
    FeedbackModule,
    RouterModule.forChild(routes)
  ]
})
export class PatientModule { }

import { AppointmentComponent } from './appointment.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { StepByStepComponent } from './step-by-step/step-by-step.component';
import { RecommendationScheduleComponent } from './recommendation-schedule/recommendation-schedule.component';

@NgModule({
  declarations: [
    StepByStepComponent,
    AppointmentComponent,
    RecommendationScheduleComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports:[AppointmentComponent]
})
export class AppointmentModule { }

import { CreateFeedbackComponent } from './create-feedback/create-feedback.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from "src/app/material/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { FeedbackComponent } from './feedback.component';


@NgModule({
  declarations: [
    FeedbackComponent,
    CreateFeedbackComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
})
export class FeedbackModule { }

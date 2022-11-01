import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from "src/app/material/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { CreateFeedbackComponent } from './create-feedback/create-feedback.component';
import { PublishedFeedbackListComponent } from './published-feedback-list/published-feedback-list.component';

const routes: Routes = [
  { path: 'feedbacks/create', component: CreateFeedbackComponent },
];

@NgModule({
  declarations: [
    CreateFeedbackComponent,
    PublishedFeedbackListComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports:[PublishedFeedbackListComponent]
})
export class FeedbackModule { }

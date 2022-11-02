import { FeedbackModule } from './../feedback/feedback.module';
import { HospitalModule } from './../hospital/hospital.module';
import { PublishedFeedbackListComponent } from './../feedback/published-feedback-list/published-feedback-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from 'src/app/app-routing.module'; 
import { HomeComponent } from './home/home.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    HomeComponent,
    LandingPageComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FeedbackModule
  ],
  exports:[NavbarComponent]
})
export class PagesModule { }

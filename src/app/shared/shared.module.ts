import { LandingPageComponent } from './landing-page/landing-page.component';
import { PublishedFeedbackListComponent } from './landing-page/published-feedback-list/published-feedback-list.component';
import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [NavbarComponent,
  PublishedFeedbackListComponent,
  LandingPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule
  ],
  exports:[NavbarComponent]
})
export class SharedModule { }

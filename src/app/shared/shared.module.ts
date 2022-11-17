import { LandingPageComponent } from './landing-page/landing-page.component';
import { PublishedFeedbackListComponent } from './landing-page/published-feedback-list/published-feedback-list.component';
import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms'; 



@NgModule({
  declarations: [NavbarComponent,
  PublishedFeedbackListComponent,
  LandingPageComponent,
  LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    FormsModule
  ],
  exports:[NavbarComponent]
})
export class SharedModule { }

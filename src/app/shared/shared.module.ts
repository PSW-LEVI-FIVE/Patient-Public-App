import { LandingPageComponent } from './landing-page/landing-page.component';
import { PublishedFeedbackListComponent } from './landing-page/published-feedback-list/published-feedback-list.component';
import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { MaterialModule } from '../material/material.module';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { AdvertisementsComponent } from './landing-page/advertisements/advertisements.component';
import { SlideComponent } from './landing-page/advertisements/slide/slide.component';
import { CardCarouselComponent } from './landing-page/card-carousel/card-carousel.component';



@NgModule({
  declarations: [NavbarComponent,
  PublishedFeedbackListComponent,
  LandingPageComponent,
  LoginComponent,
  SideMenuComponent,
  AdvertisementsComponent,
  SlideComponent,
  CardCarouselComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports:[NavbarComponent,SideMenuComponent]
})
export class SharedModule { }

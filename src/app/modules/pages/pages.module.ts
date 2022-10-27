import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from 'src/app/app-routing.module'; 
import { HomeComponent } from './home/home.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

@NgModule({
  declarations: [
    HomeComponent,
    LandingPageComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
  ]
})
export class PagesModule { }

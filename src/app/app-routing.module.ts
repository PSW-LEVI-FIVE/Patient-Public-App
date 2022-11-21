import { PatientComponent } from './patient/patient.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {LandingPageComponent} from "./shared/landing-page/landing-page.component";
import { LoginComponent } from './shared/login/login.component';
import { AuthGuard } from './shared/login/model/auth.guard';
import { BrowserModule } from '@angular/platform-browser';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path:'login', component : LoginComponent},
  { path: 'patient', component: PatientComponent,canActivate:[AuthGuard] },
  //{ path: 'patient',loadChildren:()=>import('../app/patient/patient.module').then(a=>a.PatientModule),canActivate:[AuthGuard]}
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)],
  
  exports: [RouterModule]
})
export class AppRoutingModule { }

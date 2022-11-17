import { PatientComponent } from './patient/patient.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {LandingPageComponent} from "./shared/landing-page/landing-page.component";
import { LoginComponent } from './shared/login/login.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path:'login', component : LoginComponent},
  { path: 'patient', component: PatientComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

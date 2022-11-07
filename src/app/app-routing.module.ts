import { PatientComponent } from './patient/patient.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {LandingPageComponent} from "./shared/landing-page/landing-page.component";

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'patient', component: PatientComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

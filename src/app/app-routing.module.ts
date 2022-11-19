import { PatientComponent } from './patient/patient.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {LandingPageComponent} from "./shared/landing-page/landing-page.component";
import { LoginComponent } from './shared/login/login.component';
import { AuthGuard } from './shared/login/model/auth.guard';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path:'login', component : LoginComponent},
  { path: 'patient', component: PatientComponent },
  { path:'patient',component:PatientComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

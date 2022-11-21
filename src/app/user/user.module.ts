import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationSuccessComponent } from './registration-success/registration-success.component';
import { AccountActivationComponent } from './account-activation/account-activation.component';
import { ActivationFailedComponent } from './activation-failed/activation-failed.component';

const routes: Routes = [
  {
    path: 'user',
    component: UserComponent,
    children: [
      {
        path: 'register',
        component: RegistrationComponent,
      },
      {
        path: 'register/success',
        component: RegistrationSuccessComponent,
      },
      {
        path: 'activation/failed',
        component: ActivationFailedComponent,
      },
      {
        path: 'activation/:code',
        component: AccountActivationComponent,
      },
    ]

  }]

@NgModule({
  declarations: [
    UserComponent,
    RegistrationComponent,
    RegistrationSuccessComponent,
    AccountActivationComponent,
    ActivationFailedComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class UserModule { }

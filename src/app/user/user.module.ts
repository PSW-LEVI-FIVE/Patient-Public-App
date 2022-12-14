import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountActivationComponent } from './account-activation/account-activation.component';

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
        path: 'activation/:code',
        component: AccountActivationComponent,
      },
    ]

  }]

@NgModule({
  declarations: [
    UserComponent,
    RegistrationComponent,
    AccountActivationComponent,
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

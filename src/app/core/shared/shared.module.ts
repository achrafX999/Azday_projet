import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoundedContainerComponent } from './authentification/rounded-container/rounded-container.component';
import { SignInFormComponent } from './authentification/sign-in-form/sign-in-form.component';
import { SignUpComponent } from '../../pages/authentification/sign-up/sign-up.component';
import { SignUpFormComponent } from './authentification/sign-up-form/sign-up-form.component';
import { RouterLink } from '@angular/router';
import { AppRoutingModule } from '../../app-routing.module';

@NgModule({
  declarations: [
    RoundedContainerComponent,
    SignInFormComponent,
    SignUpFormComponent
  ],
  exports: [
    RoundedContainerComponent,
    SignInFormComponent,
    SignUpFormComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    AppRoutingModule
  ]
})
export class SharedModule {}

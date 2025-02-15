import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoundedContainerComponent } from './authentification/rounded-container/rounded-container.component';
import { SignInFormComponent } from './authentification/sign-in-form/sign-in-form.component';
import { SignUpComponent } from '../../pages/authentification/sign-up/sign-up.component';
import { SignUpFormComponent } from './authentification/sign-up-form/sign-up-form.component';
import { RouterLink } from '@angular/router';
import { AppRoutingModule } from '../../app-routing.module';
import { HeaderComponent } from './header/header.component';
import { Backround_imageComponent } from './backround_image/backround_image.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { RecentBusinessesComponent } from '../components/recent-businesses/recent-businesses.component';
import { FooterComponent } from './footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RoundedContainerComponent,
    SignInFormComponent,
    SignUpFormComponent,
    HeaderComponent,
    Backround_imageComponent,
    SearchBarComponent,
    FooterComponent
  ],
  exports: [
    RoundedContainerComponent,
    SignInFormComponent,
    SignUpFormComponent,
    HeaderComponent,
    Backround_imageComponent,
    SearchBarComponent,
    FooterComponent,
    ReactiveFormsModule  
  ],
  imports: [
    CommonModule,
    RouterLink,
    AppRoutingModule,
    ReactiveFormsModule  
  ]
})
export class SharedModule {}

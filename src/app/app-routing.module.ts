import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './pages/authentification/sign-in/sign-in.component';
import { SignUpComponent } from './pages/authentification/sign-up/sign-up.component';
import { HomeComponent } from './pages/home/home.component';
import { AddBusinessComponent } from './pages/add-business/add-business.component';
import { AuthCallbackComponent } from './core/shared/authentification/auth-callback/auth-callback.component';
import { PhoneVerificationComponent } from './core/shared/authentification/phone-verification/phone-verification.component';
import { BusinessListComponent } from './pages/business-list/business-list.component';
import { BusinessProfilComponent } from './pages/business-profil/business-profil.component';
import { ContactUsComponent } from './pages/contact_us/contact_us.component';

const routes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'auth/callback', component: AuthCallbackComponent },
  { path: 'home', component: HomeComponent },
  { path: 'add-business', component: AddBusinessComponent },
  { path: 'verify-phone', component: PhoneVerificationComponent },
  { path: 'business-list', component:BusinessListComponent }, 
  { path: 'business-profil/:id', component: BusinessProfilComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' }, // Default redirection
  { path: '**', redirectTo: '/sign-in' }, // Handle invalid routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

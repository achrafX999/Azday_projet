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
import { AuthGuard } from './guards/auth.guard'; // Assurez-vous que le chemin est correct

const routes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'auth/callback', component: AuthCallbackComponent },
  { path: 'home', component: HomeComponent },
  // La route add-business est protégée par AuthGuard
  { path: 'add-business', component: AddBusinessComponent, canActivate: [AuthGuard] },
  { path: 'verify-phone', component: PhoneVerificationComponent },
  { path: 'business-list', component: BusinessListComponent },
  { path: 'business-profil/:id', component: BusinessProfilComponent },
  // Par défaut, rediriger vers la page Home
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

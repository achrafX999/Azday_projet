import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './pages/authentification/sign-in/sign-in.component';
import { SignUpComponent } from './pages/authentification/sign-up/sign-up.component';
import { HomeComponent } from './pages/home/home.component';
import { AddBusinessComponent } from './pages/add-business/add-business.component';
import { AuthCallbackComponent } from './core/shared/authentification/auth-callback/auth-callback.component';

const routes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'auth/callback', component: AuthCallbackComponent },
  { path: 'home', component: HomeComponent },
  { path: 'add-business', component: AddBusinessComponent },
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' }, // Redirection par défaut
  { path: '**', redirectTo: '/sign-in' }, // Gestion des routes invalides
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

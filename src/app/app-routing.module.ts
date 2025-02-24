import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './pages/authentification/sign-in/sign-in.component';
import { SignUpComponent } from './pages/authentification/sign-up/sign-up.component';
import { HomeComponent } from './pages/home/home.component';
import { AddBusinessComponent } from './pages/add-business/add-business.component';
import { BusinessListComponent } from './pages/business-list/business-list.component';
import { BusinessProfilComponent } from './pages/business-profil/business-profil.component';

const routes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'home', component: HomeComponent },
  { path: 'add-business', component: AddBusinessComponent },
  { path: 'business-list', component:BusinessListComponent }, 
  { path: 'business-profil', component:BusinessProfilComponent},
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' }, // Default redirection
  { path: '**', redirectTo: '/sign-in' }, // Handle invalid routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

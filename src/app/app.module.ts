import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './core/shared/shared.module';
import { SignInModule } from './pages/authentification/sign-in/signe-in.module';
import { SignUpModule } from './pages/authentification/sign-up/sign-up.module';
import { HomeModule } from './pages/home/home.module';
import { AddBusinessModule } from './pages/add-business/add-business.module';
import { RouterModule } from '@angular/router';
import { BusinessListModule } from './pages/business-list/business-list.module';
import { BusinessProfilModule } from './pages/business-profil/business-profil.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { PhoneVerificationModule } from './core/shared/authentification/phone-verification/phone-verification.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule.forRoot([], { useHash: true }),  // ➡️ Corrigé ici
    SignInModule,
    SignUpModule,
    PhoneVerificationModule,
    HomeModule,
    AddBusinessModule,
    HttpClientModule,
    SharedModule,
    BusinessListModule,
    BusinessProfilModule
  ],
  providers: [],  // ➡️ Enlève provideHttpClient(withFetch()) si Angular < 15
  bootstrap: [AppComponent]
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './core/shared/shared.module';
import { SignInModule } from './pages/authentification/sign-in/signe-in.module';
import { SignInFormComponent } from './core/shared/authentification/sign-in-form/sign-in-form.component'; // Correction ici
import { SignUpModule } from './pages/authentification/sign-up/sign-up.module';

@NgModule({
  declarations: [
    AppComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SignInModule,
    SignUpModule,
    SharedModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

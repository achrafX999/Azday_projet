import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './core/shared/shared.module';
import { SignInModule } from './pages/authentification/sign-in/signe-in.module';
import { SignInFormComponent } from './core/shared/authentification/sign-in-form/sign-in-form.component'; // Correction ici
import { SignUpModule } from './pages/authentification/sign-up/sign-up.module';
import { HomeModule } from './pages/home/home.module';
import { AddBusinessModule } from './pages/add-business/add-business.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SignInModule,
    SignUpModule,
    HomeModule,
    AddBusinessModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forRoot([]) // Ensure RouterModule is imported
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

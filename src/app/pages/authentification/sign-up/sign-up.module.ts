import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SignUpComponent } from './sign-up.component';
import { SharedModule } from '../../../core/shared/shared.module'; // Import du module partagé
import { PhoneVerificationModule } from '../../../core/shared/authentification/phone-verification/phone-verification.module';

@NgModule({
  declarations: [
    SignUpComponent, // Déclaration du composant d'inscription
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // Nécessaire pour les formulaires réactifs
    SharedModule, // Inclut les composants partagés comme RoundedContainer
    PhoneVerificationModule
  ],
})
export class SignUpModule {}

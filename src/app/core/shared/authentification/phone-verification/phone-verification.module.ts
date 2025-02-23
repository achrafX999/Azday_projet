import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhoneVerificationComponent } from './phone-verification.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [PhoneVerificationComponent]
})
export class PhoneVerificationModule { }

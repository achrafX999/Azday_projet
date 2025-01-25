import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in.component';
import { SharedModule } from '../../../core/shared/shared.module';

@NgModule({
  declarations: [SignInComponent],
  imports: [CommonModule, SharedModule],
  exports: [SignInComponent]
})
export class SignInModule {}

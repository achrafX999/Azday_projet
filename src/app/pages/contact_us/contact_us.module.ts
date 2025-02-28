import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contact_usComponent } from './contact_us.component';
import { SharedModule } from '../../core/shared/shared.module';

@NgModule({
  imports: [
        CommonModule,
        SharedModule,
  ],
  declarations: [Contact_usComponent]
})
export class Contact_usModule { }

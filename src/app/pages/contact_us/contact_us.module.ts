import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { ContactUsComponent } from './contact_us.component';
import { SharedModule } from '../../core/shared/shared.module';

@NgModule({
  declarations: [ContactUsComponent],
  imports: [CommonModule, FormsModule, SharedModule],
  exports: [ContactUsComponent] // <-- Ensure the component is exported
})
export class ContactUsModule {}  // <-- Ensure the module name is correct

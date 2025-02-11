import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddBusinessComponent } from './add-business.component';
import { SharedModule } from '../../core/shared/shared.module';
import { ComponentModule } from '../../core/components/component.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ComponentModule
  ],
  declarations: [AddBusinessComponent],
  
})
export class AddBusinessModule { }

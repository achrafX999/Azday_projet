import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessListComponent } from './business-list.component';
import { SharedModule } from '../../core/shared/shared.module';
import { ComponentModule } from '../../core/components/component.module';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ComponentModule
  ],
  declarations: [BusinessListComponent]
})
export class BusinessListModule { }

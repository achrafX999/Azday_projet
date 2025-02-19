import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessListComponent } from './business-list.component';
import { SharedModule } from '../../core/shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [BusinessListComponent]
})
export class BusinessListModule { }

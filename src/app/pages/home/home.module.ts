import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from '../../core/shared/shared.module';
import { ComponentModule } from '../../core/components/component.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ComponentModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }

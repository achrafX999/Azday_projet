import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../../app-routing.module';
import { RouterLink } from '@angular/router';
import { RecentBusinessesComponent } from './recent-businesses/recent-businesses.component';

@NgModule({
  declarations: [
    RecentBusinessesComponent
  ],
  exports: [
    RecentBusinessesComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    AppRoutingModule
  ]
})
export class ComponentModule { }

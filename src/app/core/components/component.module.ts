import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../../app-routing.module';
import { RouterLink } from '@angular/router';
import { RecentBusinessesComponent } from './recent-businesses/recent-businesses.component';
import { Deux_circle_image_homeComponent } from './deux_circle_image_home/deux_circle_image_home.component';

@NgModule({
  declarations: [
    RecentBusinessesComponent,
    Deux_circle_image_homeComponent
  ],
  exports: [
    RecentBusinessesComponent,
    Deux_circle_image_homeComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    AppRoutingModule
  ]
})
export class ComponentModule { }

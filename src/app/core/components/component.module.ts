import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../../app-routing.module';
import { RouterLink } from '@angular/router';
import { RecentBusinessesComponent } from './recent-businesses/recent-businesses.component';
import { Deux_circle_image_homeComponent } from './deux_circle_image_home/deux_circle_image_home.component';
import { AddImagesComponent } from './add-images/add-images.component';
import { OpeningHoursComponent } from './opening-hours/opening-hours.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RecentBusinessesComponent,
    Deux_circle_image_homeComponent,
    AddImagesComponent,
    OpeningHoursComponent
  ],
  exports: [
    RecentBusinessesComponent,
    Deux_circle_image_homeComponent,
    AddImagesComponent,
    OpeningHoursComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    AppRoutingModule,
    FormsModule
  ]
})
export class ComponentModule { }

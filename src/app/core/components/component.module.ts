import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../../app-routing.module';
import { RouterLink } from '@angular/router';
import { RecentBusinessesComponent } from './recent-businesses/recent-businesses.component';
import { Deux_circle_image_homeComponent } from './home/deux_circle_image_home/deux_circle_image_home.component';
import { AddImagesComponent } from './add-images/add-images.component';
import { OpeningHoursComponent } from './opening-hours/opening-hours.component';
import { FormsModule } from '@angular/forms';
import { RecentSearchesComponent } from './home/recent-searches/recent-searches.component';
import { RecentlyViewedComponent } from './home/recently-viewed/recently-viewed.component';
import { MapComponent } from '../shared/map/map.component';
import { SharedModule } from '../shared/shared.module';
import { MapSectionComponent } from './home/map-section/map-section.component';
import { ReviewComponent } from './home/review/review.component';
import { BusinessListContainerComponent } from './BusinessListContainer/BusinessListContainer.component';
import { Contact_usComponent } from '../../pages/contact-us/contact-us.component';

@NgModule({
  declarations: [
    RecentBusinessesComponent,
    Deux_circle_image_homeComponent,
    AddImagesComponent,
    OpeningHoursComponent,
    RecentSearchesComponent,
    RecentlyViewedComponent,
    MapSectionComponent,
    ReviewComponent,
    BusinessListContainerComponent
  ],
  exports: [
    RecentBusinessesComponent,
    Deux_circle_image_homeComponent,
    AddImagesComponent,
    OpeningHoursComponent,
    RecentSearchesComponent,
    RecentlyViewedComponent,
    MapSectionComponent,
    ReviewComponent,
    Contact_usComponent,
    BusinessListContainerComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    AppRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class ComponentModule { }

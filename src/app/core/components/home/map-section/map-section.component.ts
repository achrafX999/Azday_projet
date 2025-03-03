import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { BusinessService, BusinessLocation } from '../../../shared/services/business.service';
import { isPlatformBrowser } from '@angular/common';
import * as L from 'leaflet';

@Component({
  selector: 'app-map-section',
  templateUrl: './map-section.component.html',
  styleUrls: ['./map-section.component.css']
})
export class MapSectionComponent implements OnInit {
  private map: any;

  constructor(private businessService: BusinessService, @Inject(PLATFORM_ID) private platformId: Object) {}

  async ngOnInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      const L = await import('leaflet');

      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'assets/marker icon.png',
        iconUrl: 'assets/marker icon.png',
        shadowUrl: 'assets/marker-shadow.png'
      });

      this.map = L.map('map-section').setView([33.5731, -7.5898], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(this.map);

      setTimeout(() => {
        this.map.invalidateSize();  // ➡️ Forcer le recalcul de la taille
      }, 0);

      this.loadBusinessLocations();  // Charger les localisations des entreprises
    }
  }

  private loadBusinessLocations(): void {
    this.businessService.getBusinessLocations().subscribe((locations: BusinessLocation[]) => {
      import('leaflet').then(L => {
        locations.forEach((location) => {
          const marker = L.marker([location.latitude, location.longitude])
            .addTo(this.map)
            .bindPopup(`<b>${location.name}</b>`);
        });
      });
    });
  }
}

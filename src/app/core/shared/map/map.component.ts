import { Component, AfterViewInit, Output, EventEmitter, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BusinessService, BusinessLocation } from '../services/business.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  private map: any;
  private marker: any = null;

  @Output() locationSelected = new EventEmitter<{ lat: number; lng: number }>();

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private businessService: BusinessService) {}

  async ngAfterViewInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      const L = await import('leaflet');

      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'assets/marker icon.png',
        iconUrl: 'assets/marker icon.png',
        shadowUrl: 'assets/marker-shadow.png'
      });

      this.map = L.map('map').setView([33.5731, -7.5898], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(this.map);

      setTimeout(() => {
        this.map.invalidateSize();  // ➡️ Forcer le recalcul de la taille
      }, 0);

      this.loadBusinessLocations();  // Charger les localisations des entreprises

      // ➡️ Ajouter le gestionnaire de clics
      this.map.on('click', (e: any) => {
        const { lat, lng } = e.latlng;
        this.locationSelected.emit({ lat, lng });

        if (this.marker) {
          this.marker.setLatLng(e.latlng);
        } else {
          this.marker = L.marker(e.latlng).addTo(this.map);
        }
        console.log(`Coordonnées sélectionnées: Latitude ${lat}, Longitude ${lng}`);
      });
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

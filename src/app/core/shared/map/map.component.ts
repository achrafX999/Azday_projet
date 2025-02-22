import { Component, AfterViewInit, Output, EventEmitter, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  private map: any;
  private marker: any = null;

  @Output() locationSelected = new EventEmitter<{ lat: number; lng: number }>();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  async ngAfterViewInit(): Promise<void> {
    // Vérifie que le code s'exécute bien dans un navigateur
    if (isPlatformBrowser(this.platformId)) {
      const L = await import('leaflet');

      // Correction pour le problème d'icônes avec Leaflet
      // (les icônes par défaut ne s'affichent pas toujours correctement avec Webpack/Vite)
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'assets/marker icon.png',
        iconUrl: 'assets/marker icon.png',
        shadowUrl: 'assets/marker-shadow.png'
      });

      // Initialisation de la carte
      this.map = L.map('map').setView([33.5731, -7.5898], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(this.map);

      this.map.on('click', (e: L.LeafletMouseEvent) => {
        const { lat, lng } = e.latlng;
        this.locationSelected.emit({ lat, lng });

        if (this.marker) {
          this.marker.setLatLng(e.latlng);
        } else {
          this.marker = L.marker(e.latlng).addTo(this.map);
        }
      });
    }
  }
}

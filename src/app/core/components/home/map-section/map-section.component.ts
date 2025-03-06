import { Component, OnInit, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { BusinessService } from '../../../shared/services/business.service';

@Component({
  selector: 'app-map-section',
  templateUrl: './map-section.component.html',
  styleUrls: ['./map-section.component.css']
})
export class MapSectionComponent implements OnInit {
  private map: any;
  private L: any;
  businesses: any[] = [];
  isBrowser: boolean = false;

  constructor(
    private businessService: BusinessService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.loadBusinesses();
  }

  loadBusinesses(): void {
    this.businessService.getAllBusinesses().subscribe(
      async data => {
        this.businesses = data;
        if (this.isBrowser) {
          await this.initMap();
        }
      },
      error => {
        console.error('Erreur lors de la récupération des businesses:', error);
      }
    );
  }

  async initMap(): Promise<void> {
    // Import dynamique de Leaflet côté client
    this.L = await import('leaflet');

    // Correction des icônes par défaut de Leaflet
    delete (this.L.Icon.Default.prototype as any)._getIconUrl;
    this.L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'assets/marker icon.png',
      iconUrl: 'assets/marker icon.png',
      shadowUrl: 'assets/marker-shadow.png'
    });

    // Position de départ par défaut
    const defaultLat = 33.5731;
    const defaultLng = -7.5898;
    this.map = this.L.map('map-section').setView([defaultLat, defaultLng], 13);

    this.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    // Tableau pour stocker les positions des marqueurs
    const markersCoords: any[] = [];

    // Pour chaque business avec coordonnées, ajoute un marqueur
    this.businesses.forEach(business => {
      if (business.latitude && business.longitude) {
        this.L.marker([business.latitude, business.longitude])
          .addTo(this.map)
          .bindPopup(`<strong>${business.name}</strong><br>${business.address}`);
        markersCoords.push([business.latitude, business.longitude]);
      }
    });

    // Si des marqueurs ont été ajoutés, ajuste la vue de la carte pour les inclure tous
    if (markersCoords.length > 0) {
      this.map.fitBounds(markersCoords, { padding: [20, 20] });
    }

    // Force la mise à jour de la taille de la carte (utile si le conteneur était masqué lors de l'initialisation)
    setTimeout(() => {
      this.map.invalidateSize();
    }, 0);
  }
}

import { Component, AfterViewInit, OnChanges, SimpleChanges, Input, Output, EventEmitter, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-map',
  template: `<div *ngIf="isBrowser" id="map" style="height: 400px;"></div>`,
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit, OnChanges {
  @Input() latitude: number | null = null;
  @Input() longitude: number | null = null;
  @Input() selectable: boolean = true; // Permet de désactiver la sélection en mode affichage
  @Output() locationSelected = new EventEmitter<{ lat: number; lng: number }>();

  private map: any;
  private marker: any = null;
  private L: any;  // Référence à Leaflet

  isBrowser: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  async ngAfterViewInit(): Promise<void> {
    if (!this.isBrowser) return;
    await this.initMap();
  }

  async initMap(): Promise<void> {
    // Import dynamique de Leaflet côté client
    this.L = await import('leaflet');
    
    // Correction des icônes par défaut
    delete (this.L.Icon.Default.prototype as any)._getIconUrl;
    this.L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'assets/marker icon.png',
      iconUrl: 'assets/marker icon.png',
      shadowUrl: 'assets/marker-shadow.png'
    });

    // Utiliser les coordonnées passées en Input ou des valeurs par défaut
    const lat = this.latitude !== null ? this.latitude : 33.5731;
    const lng = this.longitude !== null ? this.longitude : -7.5898;
    this.map = this.L.map('map').setView([lat, lng], 13);

    this.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    // Si des coordonnées sont fournies, afficher un marqueur ; sinon, si selectable est true, écouter les clics
    if (this.latitude !== null && this.longitude !== null) {
      this.marker = this.L.marker([this.latitude, this.longitude]).addTo(this.map);
    } else if (this.selectable) {
      this.map.on('click', (e: any) => {
        const { lat, lng } = e.latlng;
        this.locationSelected.emit({ lat, lng });
        if (this.marker) {
          this.marker.setLatLng(e.latlng);
        } else {
          this.marker = this.L.marker(e.latlng).addTo(this.map);
        }
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Si la carte est initialisée et que les coordonnées changent, mettre à jour la vue
    if (!this.isBrowser || !this.map) return;
    if (changes['latitude'] || changes['longitude']) {
      const lat = this.latitude !== null ? this.latitude : 33.5731;
      const lng = this.longitude !== null ? this.longitude : -7.5898;
      this.map.setView([lat, lng], 13);
      if (this.marker) {
        this.marker.setLatLng([lat, lng]);
      } else if (this.L) {
        this.marker = this.L.marker([lat, lng]).addTo(this.map);
      }
    }
  }
}

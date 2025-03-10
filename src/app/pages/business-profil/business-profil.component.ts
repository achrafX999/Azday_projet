import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-business-profil',
  templateUrl: './business-profil.component.html',
  styleUrls: ['./business-profil.component.css']
})
export class BusinessProfilComponent implements OnInit {
  businessId!: number;
  businessData: any = {};
  showPhone: boolean = false;

  // Variables pour limiter l'incrémentation par utilisateur
  helpfulClicked: boolean = false;
  reportClicked: boolean = false;

  // Liste complète des jours
  daysOfWeek: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Index du jour sélectionné – 0 par défaut (Monday)
  selectedDayIndex = 0;

  // Contrôle de l'affichage du dropdown
  showDropdown = false;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.businessId = +this.route.snapshot.paramMap.get('id')!;
    this.fetchBusinessData();
  }

  fetchBusinessData(): void {
    // Exemple d'appel API pour récupérer les données du business
    this.http.get(`http://127.0.0.1:8000/api/business/${this.businessId}/`)
      .subscribe(
        data => {
          this.businessData = data;
          // Stocker en localStorage (ou sessionStorage) le dernier business consulté
          localStorage.setItem('lastViewedBusiness', JSON.stringify({
            id: this.businessData.id,
            name: this.businessData.name,
            subtitle: this.businessData.description, // ou tout autre champ
            viewedDate: new Date().toISOString()     // Pour indiquer la date de consultation
          }));
        },
        error => {
          console.error('Erreur lors de la récupération du business:', error);
        }
      );
  }

  // Fonction qui bascule l'affichage du dropdown
  toggleDropdown(event: Event): void {
    event.stopPropagation();
    this.showDropdown = !this.showDropdown;
    console.log('Dropdown toggled:', this.showDropdown);
  }
  

  // Fonction pour sélectionner un jour et fermer le dropdown
  selectDay(index: number): void {
    this.selectedDayIndex = index;
    this.showDropdown = false;
  }

  // Récupère l'horaire d'ouverture et de fermeture pour un jour donné
  getOpenCloseTime(day: string): { open: string | null, close: string | null } {
    if (!this.businessData.opening_hours) return { open: null, close: null };
    const oh = this.businessData.opening_hours.find((item: any) => item.day === day);
    return oh ? { open: oh.open_time, close: oh.close_time } : { open: null, close: null };
  }

  // Convertit un horaire du format HH:MM:SS au format 12h (ex: "07:00:00" -> "7:00 AM")
  transformTimeToAmPm(timeString: string | null): string {
    if (!timeString) return 'Closed';
    const [hourStr, minuteStr] = timeString.split(':');
    let hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);
    const suffix = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12;
    return `${hour}:${minute.toString().padStart(2, '0')} ${suffix}`;
  }

  getProfilePicture(pic: string | null): string {
    if (!pic) {
      return '/assets/business_default_image.png';
    }
    // Si pic commence déjà par "http", on le renvoie directement
    return pic.startsWith('http') ? pic : 'http://127.0.0.1:8000/' + pic;
  }
  
  getGalleryImageUrl(url: string | null): string {
    if (!url) {
      return '/assets/default-gallery.png';
    }
    // Si l'URL commence déjà par "http", on ne la préfixe pas à nouveau.
    return url.startsWith('http') ? url : 'http://127.0.0.1:8000/' + url;
  }
  // Méthode pour basculer l'affichage du numéro de téléphone
  togglePhone(): void {
    this.showPhone = !this.showPhone;
  }

  // Méthode pour rediriger vers le site web de l'entreprise
  goToWebsite(): void {
    console.log('Website button clicked, URL:', this.businessData.website);
    if (this.businessData.website) {
      window.open(this.businessData.website, '_blank');
    } else {
      console.warn('Aucune URL disponible pour website.');
    }
  }
  // Incrémente le compteur helpful sur le backend
  onHelpfulClick(): void {
    if (this.helpfulClicked) return; // Ne pas autoriser plusieurs clics
    this.http.post(`http://127.0.0.1:8000/api/business/${this.businessId}/helpful/`, {})
      .subscribe(
        (response: any) => {
          this.businessData.helpful_count = response.helpful_count;
          this.helpfulClicked = true;
          console.log('Helpful count mis à jour:', response.helpful_count);
        },
        error => console.error("Erreur lors de l'incrémentation de helpful:", error)
      );
  }

  // Incrémente le compteur report sur le backend
  onReportClick(): void {
    if (this.reportClicked) return;
    this.http.post(`http://127.0.0.1:8000/api/business/${this.businessId}/report/`, {})
      .subscribe(
        (response: any) => {
          this.businessData.report_count = response.report_count;
          this.reportClicked = true;
          console.log('Report count mis à jour:', response.report_count);
        },
        error => console.error("Erreur lors de l'incrémentation de report:", error)
      );
  }

  // Partage l'URL de la page
  onShareClick(): void {
    const shareData = {
      title: this.businessData.name,
      text: this.businessData.description,
      url: window.location.href
    };
    if (navigator.share) {
      navigator.share(shareData)
        .then(() => console.log("Contenu partagé avec succès"))
        .catch(error => console.error("Erreur lors du partage:", error));
    } else {
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert("URL copiée dans le presse-papiers !"))
        .catch(error => console.error("Erreur lors de la copie de l'URL:", error));
    }
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-opening-hours',
  templateUrl: './opening-hours.component.html',
  styleUrls: ['./opening-hours.component.css']
})
export class OpeningHoursComponent {
  days = [
    { dayName: 'Saturday', openTime: '', closeTime: '' },
    { dayName: 'Sunday', openTime: '', closeTime: '' },
    { dayName: 'Monday', openTime: '', closeTime: '' },
    { dayName: 'Tuesday', openTime: '', closeTime: '' },
    { dayName: 'Wednesday', openTime: '', closeTime: '' },
    { dayName: 'Thursday', openTime: '', closeTime: '' },
    { dayName: 'Friday', openTime: '', closeTime: '' },
  ];

  // Vous pouvez ensuite récupérer ces valeurs pour les envoyer à votre backend
  saveHours() {
    console.log(this.days);
    // Faire un appel HTTP ou stocker les données
  }
}

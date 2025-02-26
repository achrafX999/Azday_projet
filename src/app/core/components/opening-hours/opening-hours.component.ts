import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-opening-hours',
  templateUrl: './opening-hours.component.html',
  styleUrls: ['./opening-hours.component.css']
})
export class OpeningHoursComponent {
  // Tableau des horaires d'ouverture
  days = [
    { dayName: 'Saturday', openTime: '', closeTime: '' },
    { dayName: 'Sunday', openTime: '', closeTime: '' },
    { dayName: 'Monday', openTime: '', closeTime: '' },
    { dayName: 'Tuesday', openTime: '', closeTime: '' },
    { dayName: 'Wednesday', openTime: '', closeTime: '' },
    { dayName: 'Thursday', openTime: '', closeTime: '' },
    { dayName: 'Friday', openTime: '', closeTime: '' },
  ];

  // EventEmitter pour transmettre les horaires au composant parent
  @Output() openingHoursChanged = new EventEmitter<any>();

  // Vous pouvez appeler cette méthode à chaque changement, ou sur un bouton "Save Hours"
  saveHours(): void {
    console.log("Horaires d'ouverture:", this.days);
    this.openingHoursChanged.emit(this.days);
  }
}

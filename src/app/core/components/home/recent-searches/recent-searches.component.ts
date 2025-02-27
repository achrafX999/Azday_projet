import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recent-searches',
  templateUrl: './recent-searches.component.html',
  styleUrls: ['./recent-searches.component.css']
})
export class RecentSearchesComponent implements OnInit {
  // Exemples de recherches récentes (données statiques pour le moment)
  recentSearches = [
    { name: 'Plumber, Toronto, ON', viewedDaysAgo: 3 },
    { name: 'Electrician, Ottawa, ON', viewedDaysAgo: 5 },
    // Ajoutez d’autres recherches selon vos besoins
  ];

  constructor() {}

  ngOnInit(): void {}

  // Méthode pour gérer la fermeture/suppression d’une recherche
  removeSearch(index: number) {
    this.recentSearches.splice(index, 1);
  }
}

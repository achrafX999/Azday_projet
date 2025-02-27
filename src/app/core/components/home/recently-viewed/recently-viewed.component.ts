import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recently-viewed',
  templateUrl: './recently-viewed.component.html',
  styleUrls: ['./recently-viewed.component.css']
})
export class RecentlyViewedComponent implements OnInit {
  // Exemples de businesses récemment consultés
  recentlyViewed = [
    { name: 'Century Plumbing & Heating', viewedDaysAgo: 3 },
    { name: 'Bob’s Electric Services', viewedDaysAgo: 2 },
    // Ajoutez d’autres items si vous le souhaitez
  ];

  constructor() {}

  ngOnInit(): void {}

  // Méthode pour gérer la suppression d’un business de la liste
  removeViewed(index: number) {
    this.recentlyViewed.splice(index, 1);
  }
}

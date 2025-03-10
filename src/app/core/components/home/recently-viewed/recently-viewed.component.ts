import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';

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
  lastViewedBusiness: any = null;
  isBrowser: boolean = false;


  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      const data = localStorage.getItem('lastViewedBusiness');
      if (data) {
        this.lastViewedBusiness = JSON.parse(data);
      }
    }
  }
  getDaysAgo(dateString: string): string {
    const dateViewed = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - dateViewed.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    return diffDays === 0 ? 'today' : `${diffDays} day(s)`;
  }

  clearLastViewed(): void {
    localStorage.removeItem('lastViewedBusiness');
    this.lastViewedBusiness = null;
  }
  
  

  // Méthode pour gérer la suppression d’un business de la liste
  removeViewed(index: number) {
    this.recentlyViewed.splice(index, 1);
  }
}

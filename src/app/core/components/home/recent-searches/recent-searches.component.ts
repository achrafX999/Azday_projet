import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-recent-searches',
  templateUrl: './recent-searches.component.html',
  styleUrls: ['./recent-searches.component.css']
})
export class RecentSearchesComponent implements OnInit {
  recentSearches: { name: string; city: string; viewedDaysAgo: number }[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    this.loadRecentSearches();
  }

  loadRecentSearches() {
    if (isPlatformBrowser(this.platformId)) {  // ✅ Ensuring browser environment
      const storedSearches = localStorage.getItem('recentSearches');
      if (storedSearches) {
        this.recentSearches = JSON.parse(storedSearches).map((search: any) => ({
          ...search,
          viewedDaysAgo: this.calculateDaysAgo(search.date || new Date().toISOString())
        }));
      }
    } else {
      console.warn("localStorage is not available in this environment.");
    }
  }

  calculateDaysAgo(dateString: string): number {
    const searchDate = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - searchDate.getTime());
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  }

  removeSearch(index: number) {
    if (isPlatformBrowser(this.platformId)) {  // ✅ Prevent server-side execution
      this.recentSearches.splice(index, 1);
      localStorage.setItem('recentSearches', JSON.stringify(this.recentSearches));
    }
  }
}

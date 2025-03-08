import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recent-searches',
  templateUrl: './recent-searches.component.html',
  styleUrls: ['./recent-searches.component.css']
})
export class RecentSearchesComponent implements OnInit {
  recentSearches: { name: string; city: string; viewedDaysAgo: number }[] = [];

  constructor() {}

  ngOnInit() {
    this.loadRecentSearches();
  }

  loadRecentSearches() {
    const storedSearches = localStorage.getItem('recentSearches');
    if (storedSearches) {
      this.recentSearches = JSON.parse(storedSearches).map((search: any) => ({
        ...search,
        viewedDaysAgo: this.calculateDaysAgo(search.date || new Date().toISOString())
      }));
    }
  }

  calculateDaysAgo(dateString: string): number {
    const searchDate = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - searchDate.getTime());
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  }

  removeSearch(index: number) {
    this.recentSearches.splice(index, 1);
    localStorage.setItem('recentSearches', JSON.stringify(this.recentSearches));
  }
}

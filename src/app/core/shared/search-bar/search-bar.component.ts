import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  category: string = '';
  city: string = '';
  categorySuggestions: any[] = []; // Liste des catégories suggérées
  recentSearches: { name: string; city: string; viewedDaysAgo: number }[] = []; // Stockage des recherches récentes

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.loadRecentSearches();
  }

  onCategoryInput() {
    if (this.category && this.category.length > 0) {
      this.fetchCategorySuggestions(this.category);
    } else {
      this.categorySuggestions = [];
    }
  }

  fetchCategorySuggestions(query: string) {
    this.http.get<any[]>('/api/categories/', { params: { search: query } })
      .subscribe(
        response => {
          this.categorySuggestions = response;
        },
        error => {
          console.error("Erreur lors de la récupération des catégories:", error);
          this.categorySuggestions = [];
        }
      );
  }

  selectCategory(categoryObj: any) {
    this.category = categoryObj.name;
    this.categorySuggestions = [];
  }

  search() {
    console.log("Recherche lancée avec :", this.category, this.city);
    
    if (this.category || this.city) {
      this.saveSearch(this.category, this.city);
    }
    
    this.router.navigate(['/business-list'], { queryParams: { category: this.category, city: this.city } });
  }

  saveSearch(category: string, city: string) {
    const search = {
      name: category,
      city,
      viewedDaysAgo: 0 // New searches start as "viewed today"
    };
    
    this.recentSearches.unshift(search);
    if (this.recentSearches.length > 5) {
      this.recentSearches.pop();
    }
    localStorage.setItem('recentSearches', JSON.stringify(this.recentSearches));
  }

  loadRecentSearches() {
    const storedSearches = localStorage.getItem('recentSearches');
    if (storedSearches) {
      this.recentSearches = JSON.parse(storedSearches).map((search: any) => {
        return {
          ...search,
          viewedDaysAgo: this.calculateDaysAgo(search.date)
        };
      });
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

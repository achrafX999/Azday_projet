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

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {}

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

  // Nouvelle méthode search() qui utilise le Router pour naviguer
  search() {
    console.log("Recherche lancée avec :", this.category, this.city);
    // Navigation vers '/business-list' avec les query parameters
    this.router.navigate(['/business-list'], { queryParams: { category: this.category, city: this.city } });
  }
}

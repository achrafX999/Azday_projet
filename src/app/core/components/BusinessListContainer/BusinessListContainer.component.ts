import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-business-list-container',
  templateUrl: './BusinessListContainer.component.html',
  styleUrls: ['./BusinessListContainer.component.css']
})
export class BusinessListContainerComponent implements OnInit {
  paginatedBusinesses: any[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  totalResults: number = 0;
  category: string = '';
  city: string = '';

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    // Récupérer les query parameters (par exemple, depuis le SearchBar)
    this.route.queryParams.subscribe(params => {
      this.category = params['category'] || '';
      this.city = params['city'] || '';
      this.currentPage = params['page'] ? parseInt(params['page'], 10) : 1;
      this.fetchBusinesses();
    });
  }

  fetchBusinesses() {
    const searchData = { 
      category: this.category, 
      city: this.city, 
      page: this.currentPage.toString() 
    };
    this.http.get<any>('/api/search', { params: searchData })
      .subscribe(
        response => {
          this.paginatedBusinesses = response.results;
          this.currentPage = response.page;
          this.totalPages = response.total_pages;
          this.totalResults = response.total_results;
        },
        error => {
          console.error("Erreur lors de la récupération des businesses :", error);
        }
      );
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchBusinesses();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchBusinesses();
    }
  }
}

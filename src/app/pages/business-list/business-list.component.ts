import { Component, OnInit } from '@angular/core';

interface Business {
  name: string;
  address: string;
  description: string;
  logo: string;
  reviewCount: number;
  // Add whatever other fields you need
}

@Component({
  selector: 'app-business-list',
  templateUrl: './business-list.component.html',
  styleUrls: ['./business-list.component.css']
})
export class BusinessListComponent implements OnInit {

    // Example data — replace with real data or an API call
    businesses: Business[] = [
      {
        name: 'Royal Plumbing Services',
        address: '614 Dufferin St, Toronto, ON M6K 2A9',
        description: 'Free Quotes On Any Job, Plumbing, Drain Pipe Repair, Bathr...',
        logo: 'assets/plumbing-service-logo.png',
        reviewCount: 70
      },
      {
        name: 'Century Plumbing & Heating',
        address: '123 Main St, Toronto, ON A1B 2C3',
        description: 'Backflow Testing & Prevention. 24/7 emergency service.',
        logo: 'assets/century-plumbing.png',
        reviewCount: 45
      },
      // ... Add as many businesses as you want
    ];

    // Pagination
  currentPage = 1;
  itemsPerPage = 5;  // Show 5 businesses per page



  constructor() { }

  ngOnInit() {
    // If you fetch data from an API, do it here and set this.businesses
  }

  get totalResults(): number {
    return this.businesses.length;
  }

  get totalPages(): number {
    return Math.ceil(this.businesses.length / this.itemsPerPage);
  }

  /**
   * Returns only the slice of businesses to display on the current page
   */
  get paginatedBusinesses(): Business[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.businesses.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }


}

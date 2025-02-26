import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Category {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private url = 'http://127.0.0.1:8000/api/categories/'; // Assurez-vous que cette URL est correcte

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url);
  }
}

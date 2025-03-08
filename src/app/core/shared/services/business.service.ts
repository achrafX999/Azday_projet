import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  // Base URL pour les endpoints relatifs aux business
  private baseUrl = 'http://127.0.0.1:8000/api/business';

  constructor(private http: HttpClient) {}

  // Méthode pour ajouter un business via une requête POST avec FormData
  addBusiness(formData: FormData): Observable<any> {
    // Récupérer le token stocké
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Token ${token}`);
    }
    return this.http.post(`${this.baseUrl}/add/`, formData, { headers });
  }

  // Méthode pour récupérer tous les business
  getAllBusinesses(): Observable<any[]> {
    // Ajustez l'URL en fonction de votre endpoint pour récupérer tous les business
    return this.http.get<any[]>(`${this.baseUrl}/all/`);
  }
}

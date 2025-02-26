import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  private baseUrl  = 'http://127.0.0.1:8000/api/business';

  constructor(private http: HttpClient) {}

  addBusiness(formData: FormData): Observable<any> {
    // Récupérer le token stocké
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Token ${token}`);
    }
    return this.http.post(`${this.baseUrl}/add/`, formData, { headers });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisiteurService {
  private apiUrl = 'http://localhost:8000/api/visiteur/'; // Replace with your Django backend URL

  constructor(private http: HttpClient) { }

  // Send visitor data to the backend
  createVisiteur(visiteurData: any): Observable<any> {
    return this.http.post(this.apiUrl, visiteurData);
  }
}
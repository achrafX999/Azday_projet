import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // This makes the service available globally
})
export class VisiteurService {
  sendMessage(contactData: { first_name: string; last_name: string; email: string; description: string; }) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:8000/api/visiteur/'; // Replace with your backend API URL

  constructor(private http: HttpClient) { }

  // Method to send visitor data to the backend
  createVisiteur(visiteurData: any): Observable<any> {
    // Set headers for the request
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Send a POST request to the backend
    return this.http.post(this.apiUrl, visiteurData, { headers: headers });
  }
}
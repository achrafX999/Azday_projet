import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private registerUrl = 'http://127.0.0.1:8000/api/register/';
  private loginUrl = 'http://127.0.0.1:8000/api/login/'; // ✅ Correction de l'URL

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    return this.http.post(this.registerUrl, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(this.loginUrl, credentials) // ✅ Utilise la bonne URL pour le login
    .pipe(
      tap((res: any) => {
        // Sauvegarder le token
        localStorage.setItem('token', res.token);
      })
    );
  }
}


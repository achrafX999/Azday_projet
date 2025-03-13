import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private registerUrl = 'http://127.0.0.1:8000/api/register/';
  private loginUrl = 'http://127.0.0.1:8000/api/login/'; // ✅ Correction de l'URL

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

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
  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      // Ajoutez d’autres nettoyages si besoin
    }
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!(localStorage.getItem('token') || sessionStorage.getItem('token'));
    }
    return false;
  }
}


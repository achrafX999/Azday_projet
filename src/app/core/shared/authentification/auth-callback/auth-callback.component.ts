import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth-callback',
  template: '<p>Processing authentication, please wait...</p>',
})
export class AuthCallbackComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    let token: string | null = null;

    // Essayer d'extraire le token depuis les query params
    this.route.queryParams.subscribe(params => {
      token = params['token'];
      
      // Si aucun token dans les query params, vérifier dans le hash de l'URL
      if (!token) {
        const hash = window.location.hash;  // par exemple: "#token=ABC123" ou "#access_token=ABC123"
        if (hash) {
          const match = hash.match(/(?:token|access_token)=([^&]+)/);
          if (match) {
            token = match[1];
          }
        }
      }

      if (token) {
        // Stocker le token dans sessionStorage (ou localStorage)
        sessionStorage.setItem('token', token);
        // Rediriger l'utilisateur vers la page privée (par exemple, /home)
        this.router.navigate(['/home']);
      } else {
        // En cas d'absence de token, rediriger vers la page de connexion avec une erreur
        console.error("Token not found in callback URL");
        this.router.navigate(['/sign-in'], { queryParams: { error: 'Authentication failed. Please try again.' } });
      }
    });
  }
}

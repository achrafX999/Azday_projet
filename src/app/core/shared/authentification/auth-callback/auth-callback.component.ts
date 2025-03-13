import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-auth-callback',
  template: '<p>Processing authentication, please wait...</p>',
})
export class AuthCallbackComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  // Exemple dans AuthCallbackComponent
ngOnInit(): void {
  if (!isPlatformBrowser(this.platformId)) return;
  this.route.queryParams.subscribe(params => {
    let token = params['token'];
    if (!token) {
      const hash = window.location.hash;
      if (hash) {
        const match = hash.match(/(?:token|access_token)=([^&]+)/);
        if (match) {
          token = match[1];
        }
      }
    }
    if (token) {
      localStorage.setItem('token', token);
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/sign-in'], { queryParams: { error: 'Authentication failed.' } });
    }
  });
}

}

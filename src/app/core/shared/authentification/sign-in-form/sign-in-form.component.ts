import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.css']
})
export class SignInFormComponent {
  signInForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.signInForm.valid) {
      const credentials = this.signInForm.value;
  
      console.log('Données envoyées:', credentials);  // 🔍 Vérifier les données dans la console
  
      this.authService.login(credentials).subscribe(
        response => {
          console.log('Connexion réussie', response);
          localStorage.setItem('token', response.token);
          this.router.navigate(['/home']);
        },
        error => {
          console.error('Erreur de connexion', error);
          this.errorMessage = "Invalid email or password.";
        }
      );
    }
  }
  
}

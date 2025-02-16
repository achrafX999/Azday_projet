import { Component } from '@angular/core';
import { AuthService } from '../auth.service'; // Import du service
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css']
})
export class SignUpFormComponent {
  signUpForm: FormGroup;
  errorMessage: string = '';

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.signUpForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required, Validators.pattern("^[0-9]{10,15}$")]], // Ajout du champ phone_number
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      const formData = this.signUpForm.value;

      if (formData.password !== formData.confirmPassword) {
        this.errorMessage = "Passwords do not match!";
        return;
      }

      // Supprimer confirmPassword avant d'envoyer à l'API
      const apiData = { ...formData };
      delete apiData.confirmPassword;

      this.authService.register(apiData).subscribe(
        response => {
          console.log('Inscription réussie', response);
          alert('Registration successful!');
        },
        error => {
          console.error('Erreur lors de l’inscription', error);
          this.errorMessage = "An error occurred during registration.";
        }
      );
    }
  }
}

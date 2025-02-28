import { Component } from '@angular/core';
import { AuthService } from '../auth.service'; // Import du service
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css']
})
export class SignUpFormComponent {
  signUpForm: FormGroup;
  errorMessage: string = '';

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {
    this.signUpForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_number: [
        '', 
        [
          Validators.required, 
          Validators.pattern(/^(0[0-9]{9}|\+212[0-9]{9})$/)
        ]
      ],
            password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      const formData = { ...this.signUpForm.value };
      if (formData.password !== formData.confirmPassword) {
        this.errorMessage = "Passwords do not match!";
        return;
      }
      //delete formData.confirmPassword;
      this.authService.register(formData).subscribe(
        response => {
          console.log('Inscription réussie', response);
          // Redirige vers la page de vérification SMS en passant le numéro
          this.router.navigate(['/verify-phone'], { state: { phone: formData.phone_number } });
        },
        error => {
          console.error('Erreur lors de l’inscription', error);
          this.errorMessage = "An error occurred during registration.";
        }
      );
    }
  }  
}

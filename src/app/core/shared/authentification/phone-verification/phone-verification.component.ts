import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-phone-verification',
  templateUrl: './phone-verification.component.html',
  styleUrls: ['./phone-verification.component.css']
})
export class PhoneVerificationComponent implements OnInit {
  verificationForm: FormGroup;
  errorMessage = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.verificationForm = this.fb.group({
      digit1: ['', Validators.required],
      digit2: ['', Validators.required],
      digit3: ['', Validators.required],
      digit4: ['', Validators.required],
      digit5: ['', Validators.required],
      digit6: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Tu peux récupérer ici le numéro de téléphone ou autre data
  }

  // Quand l'utilisateur saisit un caractère dans un champ, on passe automatiquement au suivant
  onDigitInput(event: any, nextFieldId: string | null): void {
    const input = event.target as HTMLInputElement;
    if (input.value.length === 1 && nextFieldId) {
      // Si un caractère a été saisi, on se déplace vers le champ suivant
      const nextInput = document.getElementById(nextFieldId) as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    }
  }

  onVerify() {
    if (this.verificationForm.valid) {
      // Récupérer les 6 digits et les assembler
      const code = Object.values(this.verificationForm.value).join('');
      console.log('Code complet : ', code);

      // Appeler le backend pour vérifier le code
      // this.authService.verifyCode(code).subscribe(...)

    } else {
      this.errorMessage = 'Please enter the 6-digit code.';
    }
  }

  resendCode() {
    // Appeler le backend pour renvoyer le code
    console.log('Code resent');
  }

  goBack() {
    // Retour ou navigation
    console.log('Going back');
    this.router.navigate(['/sign-up']);

  }
}

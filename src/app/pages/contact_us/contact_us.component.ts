import { Component, OnInit } from '@angular/core';
import { VisiteurService } from '../../core/shared/services/visiteur.service'; // Import the service

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact_us.component.html',
  styleUrls: ['./contact_us.component.css']
})
export class ContactUsComponent implements OnInit {
  // Form model
  visiteurData = {
    first_name: '',
    last_name: '',
    email: '',
    description: ''
  };

  submitted = false; // Track form submission

  // Inject the service
  constructor(private visiteurService: VisiteurService) { }

  ngOnInit() {
  }

  // Handle form submission
  onSubmit() {
    this.submitted = true;

    // Validate form fields
    if (this.isFormValid()) {
      this.visiteurService.createVisiteur(this.visiteurData).subscribe(
        response => {
          console.log('Visitor data saved successfully!', response);
          alert('Thank you! We will contact you soon.'); // Show success message
          this.resetForm(); // Reset the form after submission
        },
        error => {
          console.error('Error saving visitor data:', error);
          alert('An error occurred. Please try again.'); // Show error message
        }
      );
    }
  }

  // Validate the form
  isFormValid(): boolean {
    return (
      this.visiteurData.first_name.trim() !== '' &&
      this.visiteurData.last_name.trim() !== '' &&
      this.isValidEmail(this.visiteurData.email) &&
      this.visiteurData.description.trim() !== ''
    );
  }

  // Validate email format
  isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  // Reset the form
  resetForm() {
    this.visiteurData = {
      first_name: '',
      last_name: '',
      email: '',
      description: ''
    };
    this.submitted = false;
  }
}
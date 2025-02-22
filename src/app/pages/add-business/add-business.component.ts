import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BusinessService } from '../../core/shared/services/business.service';

@Component({
  selector: 'app-add-business',
  templateUrl: './add-business.component.html',
  styleUrls: ['./add-business.component.css']
})
export class AddBusinessComponent implements OnInit {
  businessForm!: FormGroup;
  errorMessage: string = '';
  profilePicturePreview: string | ArrayBuffer | null = null;

  // Variables pour stocker la latitude et la longitude
  latitude: number | null = null;
  longitude: number | null = null;

  // Récupère toutes les références des inputs file pour le bloc d'images
  @ViewChildren('fileInput') fileInputs!: QueryList<ElementRef>;

  // Tableau pour stocker les aperçus d'images (4 emplacements initiaux)
  imagesPreviews: (string | ArrayBuffer | null)[] = [null, null, null, null];

  constructor(private fb: FormBuilder,
              private businessService: BusinessService,
              private router: Router) {}

  ngOnInit(): void {
    this.businessForm = this.fb.group({
      category: ['', Validators.required],
      businessName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      website: [''],
      address: ['', Validators.required],
      language: this.fb.array([this.fb.control('')]),
      paymentMethods: this.fb.array([this.fb.control('')]),
      productService: this.fb.array([this.fb.control('')]),
      specialize: this.fb.array([this.fb.control('')]),
      description: [''],
      
      profilePicture: [null],
      images: this.fb.array([
        this.fb.control(null),
        this.fb.control(null),
        this.fb.control(null),
        this.fb.control(null)
      ])
    });
  }

  // Getters pour les FormArray non liés aux fichiers (si nécessaire)
  get language(): FormArray {
    return this.businessForm.get('language') as FormArray;
  }
  get paymentMethods(): FormArray {
    return this.businessForm.get('paymentMethods') as FormArray;
  }
  get productService(): FormArray {
    return this.businessForm.get('productService') as FormArray;
  }
  get specialize(): FormArray {
    return this.businessForm.get('specialize') as FormArray;
  }
  get images(): FormArray {
    return this.businessForm.get('images') as FormArray;
  }

  // Méthodes pour ajouter des contrôles dans les FormArray (si nécessaire)
  addLanguage(): void {
    this.language.push(this.fb.control(''));
  }
  addPaymentMethod(): void {
    this.paymentMethods.push(this.fb.control(''));
  }
  addProductService(): void {
    this.productService.push(this.fb.control(''));
  }
  addSpecialize(): void {
    this.specialize.push(this.fb.control(''));
  }
  // Pour ajouter un nouvel emplacement d'image
  addImageControl(): void {
    this.images.push(this.fb.control(null));
    this.imagesPreviews.push(null);
  }
  addMoreImageSlot(): void {
    // Ajoute une nouvelle case d'aperçu dans le tableau
    this.imagesPreviews.push(null);
    // Ajoute un nouveau contrôle au FormArray (optionnel, si vous souhaitez gérer dynamiquement le nombre d'images dans le formulaire)
    this.images.push(this.fb.control(null));
  }

  // Méthode pour la photo de profil (similaire, si nécessaire)
  onProfilePictureSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Optionnel : vous pouvez aussi patcher ce contrôle dans le form si besoin
      this.businessForm.patchValue({ profilePicture: file });
      this.businessForm.get('profilePicture')!.updateValueAndValidity();

      const reader = new FileReader();
      reader.onload = () => {
        this.profilePicturePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Méthode pour gérer la sélection d'une image dans le bloc "Add Images"
  onImageSelected(event: any, index: number): void {
    const file = event.target.files[0];
    if (file) {
      // Optionnel : patcher le contrôle dans le form
      this.images.at(index).setValue(file);

      const reader = new FileReader();
      reader.onload = () => {
        this.imagesPreviews[index] = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Méthode appelée par le composant MapComponent
  onLocationSelected(location: { lat: number; lng: number }): void {
    this.latitude = location.lat;
    this.longitude = location.lng;

    // Vous pouvez également mettre à jour votre formulaire si nécessaire
    this.businessForm.patchValue({
      latitude: location.lat,
      longitude: location.lng
    });
    console.log('Coordonnées sélectionnées : ', location);
  }
  onSubmit(): void {
    if (this.businessForm.valid) {
      // Préparer FormData pour inclure fichiers et autres données
      const formData = new FormData();
      Object.keys(this.businessForm.value).forEach(key => {
        if (key === 'images') {
          this.businessForm.value.images.forEach((file: any, index: number) => {
            if (file) {
              formData.append(`images_${index}`, file);
            }
          });
        } else if (key === 'profilePicture') {
          if (this.businessForm.value.profilePicture) {
            formData.append('profilePicture', this.businessForm.value.profilePicture);
          }
        } else if (this.businessForm.value[key] instanceof Array) {
          formData.append(key, JSON.stringify(this.businessForm.value[key]));
        } else {
          formData.append(key, this.businessForm.value[key]);
        }
      });
      console.log("FormData ready to send:", formData);
      this.businessService.addBusiness(formData).subscribe(
        response => {
          console.log("Business ajouté avec succès", response);
          this.router.navigate(['/home']);
        },
        error => {
          console.error("Erreur lors de l'ajout du business", error);
          this.errorMessage = "Une erreur est survenue lors de l'ajout du business.";
        }
      );
    } else {
      this.errorMessage = "Veuillez remplir correctement tous les champs obligatoires.";
    }
  }
}

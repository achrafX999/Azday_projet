import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BusinessService } from '../../core/shared/services/business.service';
import { CategoryService,Category } from '../../models/category.model';

@Component({
  selector: 'app-add-business',
  templateUrl: './add-business.component.html',
  styleUrls: ['./add-business.component.css']
})
export class AddBusinessComponent implements OnInit {
  businessForm!: FormGroup;
  errorMessage: string = '';
  categories: Category[] = [];
  openingHoursDays: any[] = [];

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
              private categoryService: CategoryService,
              private router: Router) {}

  ngOnInit(): void {
    this.businessForm = this.fb.group({
      category: ['', Validators.required],
      name: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]], 
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
      ]),
      latitude: [null, Validators.required],
      longitude: [null, Validators.required],
    });
    // Charger les catégories depuis le service
  this.categoryService.getCategories().subscribe(
    data => {
      this.categories = data;
    },
    error => {
      console.error("Erreur lors du chargement des catégories", error);
    }
  );
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

  // Méthode pour recevoir les horaires depuis le composant enfant
  onOpeningHoursChanged(hours: any[]): void {
    this.openingHoursDays = hours;
    console.log("Horaires reçus dans le parent:", this.openingHoursDays);
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
    console.log("➡️ Formulaire soumis !");
    console.log("➡️ Formulaire valide:", this.businessForm.valid);
    console.log("➡️ Valeurs du formulaire:", this.businessForm.value);
    console.log("➡️ Opening Hours avant filtrage:", this.openingHoursDays);
    const filteredOpeningHours = this.openingHoursDays.filter(hour => hour.openTime && hour.closeTime);
    console.log("➡️ Opening Hours après filtrage:", filteredOpeningHours);
    console.log("➡️ Latitude:", this.businessForm.value.latitude);
    console.log("➡️ Longitude:", this.businessForm.value.longitude);
    if (this.businessForm.valid) {
      const formData = new FormData();
      const formValue = this.businessForm.value;
  
      // Renommer businessName en name
      formData.append('name', formValue.name); // Si le contrôle s'appelle "name" dans le FormGroup
      // Si le contrôle est "businessName", faites : formData.append('name', formValue.businessName);
      
      // Ajouter le champ category (nécessaire, car il est défini dans le formulaire)
      formData.append('category', formValue.category);
  
      // Ajouter les autres champs simples
      formData.append('description', formValue.description);
      formData.append('address', formValue.address);
      formData.append('phone_number', formValue.phoneNumber);
      formData.append('email', formValue.email);
      formData.append('website', formValue.website);
      formData.append('latitude', String(formValue.latitude || ''));
      formData.append('longitude', String(formValue.longitude || ''));

  
      // Ajouter les champs JSON (les FormArrays)
      formData.append('languages', JSON.stringify(formValue.language));
      formData.append('payment_methods', JSON.stringify(formValue.paymentMethods));
      formData.append('product_services', JSON.stringify(formValue.productService));
      formData.append('specialize', JSON.stringify(formValue.specialize));
  
      // Ajouter la photo de profil
      if (formValue.profilePicture) {
        formData.append('profile_picture', formValue.profilePicture);
    } else {
        formData.append('profile_picture', '');  // ➡️ Ajouter un champ vide pour éviter les erreurs
    }
    
  
      // Ajouter les images supplémentaires
      if (formValue.images && formValue.images.length > 0) {
        formValue.images.forEach((file: any, index: number) => {
          if (file) {
            formData.append(`images_${index}`, file);
          }
        });
      }
  
      // Ajouter les horaires d'ouverture en JSON
      
      formData.append('opening_hours', JSON.stringify(filteredOpeningHours));
  
      (Array.from((formData as any).entries()) as [string, any][]).forEach(([key, value]) => {
        console.log(`${key}: ${value}`);
    });
    
    
    
      this.businessService.addBusiness(formData).subscribe(
        response => {
          console.log("Business ajouté avec succès", response);
          this.router.navigate(['/home']);
        },
        error => {
          console.error("Erreur lors de l'ajout du business", error);
          if (error.error) {
            console.log("➡️ Erreur détaillée:", error.error);  // 🔄 Afficher les détails précis de l'erreur
          }
          this.errorMessage = error.error?.message || "Une erreur est survenue lors de l'ajout du business.";
        }
      );
    } else {
      this.errorMessage = "Veuillez remplir correctement tous les champs obligatoires.";
    }
  }
  
  
  
}

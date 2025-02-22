import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ViewChildren, QueryList, ElementRef } from '@angular/core';

@Component({
  selector: 'app-add-images',
  templateUrl: './add-images.component.html',
  styleUrls: ['./add-images.component.css']
})
export class AddImagesComponent {
  @ViewChildren('fileInput') fileInputs!: QueryList<ElementRef>;

  @Output() imagesChanged = new EventEmitter<(string | ArrayBuffer | null)[]>();
  // Tableau d'aperçus (null si pas d'image sélectionnée)
  imagesPreviews: (string | ArrayBuffer | null)[] = [null, null, null, null];

  // Méthode pour ajouter un emplacement d'image supplémentaire
  addMoreImageSlot(): void {
    this.imagesPreviews.push(null);
    this.imagesChanged.emit(this.imagesPreviews);
  }

  // Méthode appelée quand l'utilisateur sélectionne une image
  onImageSelected(event: any, index: number): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        // Stocke l'URL base64 dans imagesPreviews[index]
        this.imagesPreviews[index] = reader.result;
        this.imagesChanged.emit(this.imagesPreviews);
      };
      reader.readAsDataURL(file);
    }
  }

  // Méthode (optionnelle) pour récupérer toutes les images
  // si vous devez les envoyer au composant parent
  getSelectedImages(): (string | ArrayBuffer | null)[] {
    return this.imagesPreviews;
  }

  ngAfterViewInit(): void {
    console.log("Nombre de file inputs:", this.fileInputs.length);
  }
}




import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessProfilComponent } from './business-profil.component';
import { SharedModule } from '../../core/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [BusinessProfilComponent]
})
export class BusinessProfilModule { }

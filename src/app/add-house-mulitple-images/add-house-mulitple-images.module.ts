import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddHouseMulitpleImagesPageRoutingModule } from './add-house-mulitple-images-routing.module';

import { AddHouseMulitpleImagesPage } from './add-house-mulitple-images.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddHouseMulitpleImagesPageRoutingModule
  ],
  declarations: [AddHouseMulitpleImagesPage]
})
export class AddHouseMulitpleImagesPageModule {}

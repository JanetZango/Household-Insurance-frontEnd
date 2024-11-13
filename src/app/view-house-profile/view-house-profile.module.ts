import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewHouseProfilePageRoutingModule } from './view-house-profile-routing.module';

import { ViewHouseProfilePage } from './view-house-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewHouseProfilePageRoutingModule
  ],
  declarations: [ViewHouseProfilePage]
})
export class ViewHouseProfilePageModule {}

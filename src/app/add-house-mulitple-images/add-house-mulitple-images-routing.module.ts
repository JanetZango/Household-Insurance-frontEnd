import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddHouseMulitpleImagesPage } from './add-house-mulitple-images.page';

const routes: Routes = [
  {
    path: '',
    component: AddHouseMulitpleImagesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddHouseMulitpleImagesPageRoutingModule {}

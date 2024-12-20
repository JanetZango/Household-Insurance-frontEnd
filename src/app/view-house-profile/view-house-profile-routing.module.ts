import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewHouseProfilePage } from './view-house-profile.page';

const routes: Routes = [
  {
    path: '',
    component: ViewHouseProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewHouseProfilePageRoutingModule {}

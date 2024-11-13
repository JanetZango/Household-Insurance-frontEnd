import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../providers/AuthGuard';



const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule),
    canActivate: [AuthGuard] 
  },
  {
    path: 'register-user',
    loadChildren: () => import('./register-user/register-user.module').then( m => m.RegisterUserPageModule)
  },
  {
    path: 'add-house-mulitple-images',
    loadChildren: () => import('./add-house-mulitple-images/add-house-mulitple-images.module').then( m => m.AddHouseMulitpleImagesPageModule)
  },
  {
    path: 'view-house-profile',
    loadChildren: () => import('./view-house-profile/view-house-profile.module').then( m => m.ViewHouseProfilePageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

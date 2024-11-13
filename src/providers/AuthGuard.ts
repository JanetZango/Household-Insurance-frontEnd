// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthProvider } from '../providers/Auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthProvider, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedInStatus1()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
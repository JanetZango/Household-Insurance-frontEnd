// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthProvider } from '../providers/Auth';
import { Storage } from '@ionic/storage';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthProvider, private router: Router, public storage:Storage) { }

    async canActivate(): Promise<boolean> {
        const authenticated = await this.authService.isLoggedInStatus();
        console.log(authenticated)
        if (!authenticated) {
            this.router.navigate(['/login']); // Redirect to login page if not authenticated
            return false;
        }
        else{
            return true; 
        }
           
    }
    

}
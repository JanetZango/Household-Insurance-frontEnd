import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // This makes it available app-wide
})
export class Auth {
    isAuthenticated: boolean = false;
  constructor() {}
  // Auth service methods here
}
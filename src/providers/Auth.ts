import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
    isLoggedIn!: Boolean;
    user!: any;
    serial!: any;

    private isAuthenticated = false

    constructor(public http: HttpClient, public storage: Storage) {
        console.log('Hello AuthProvider Provider');

    }
    async login(user: any): Promise<void> {
        await this.storage.create();
        await this.storage.set('user', user);

     
    }

    getLoggedInUserDetails() {
        return this.storage.get('user')
    }


    // Check if user is authenticated
    async isLoggedInStatus(): Promise<boolean> {
        await this.storage.create();
        const token = await this.storage.get('user');
        return !!token; // Return true if token exists
    }

    // Remove token (logout)
    async logout(): Promise<void> {
        await this.storage.create();
        await this.storage.remove('user');
    }


}

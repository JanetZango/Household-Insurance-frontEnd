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


    login(user: any) {
        this.isAuthenticated = true;
        return this.storage.create().then((data) => {
            return this.storage.set('user', user).then((data) => {
                this.user = user;
            });
        })

    }

    logout() {
        this.isAuthenticated = true;
        return this.storage.create().then((data) => {
        return this.storage.remove('user').then(() => {
            this.user = null;
        });
    })

    }

    isLoggedInStatus() {
        return this.storage.create().then((data) => {
            return this.storage.get('user')
        })
    }
    isLoggedInStatus1(): boolean {
        return localStorage.getItem('user') === 'loggedIn';
      }

}

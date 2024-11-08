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
    LogeedInUser!: any;
    constructor(public http: HttpClient, public storage: Storage) {
        console.log('Hello AuthProvider Provider');

    }


    login(user: any) {
        return this.storage.create().then((data) => {
            return this.storage.set('user', user).then((data) => {
                this.isLoggedIn = true;
                this.user = user;
            });
        })

    }

    logout() {
        return this.storage.create().then((data) => {
        return this.storage.remove('user').then(() => {
            this.isLoggedIn = false;
            this.user = null;
        });
    })

    }

    getUser() {
        return this.storage.create().then((data) => {
            return this.storage.get('user')
        })
    }

}

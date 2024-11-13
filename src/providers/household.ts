
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { throwError } from 'rxjs'
import { catchError } from 'rxjs/operators';
import { ConfigService } from '../providers/config'
import { RegisterNewUser } from 'src/models/RegisterNewUser.model';
import { Authentification } from 'src/models/Authentification.model';
import { AddHouse } from 'src/models/AddHouse.model';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable()
export class HouseholdProvider {
    private readonly baseUrl!: string;
    private RegisterNewUser!: RegisterNewUser
    private Authentification!: Authentification
    constructor(public http: HttpClient, public ConfigService: ConfigService) {
        this.baseUrl = this.ConfigService.apiUrl;
        console.log('Hello GroomHeavenProvider Provider');
    }

    //Register New User Method 
    Register_UserApi(RegisterNewUser: RegisterNewUser) {
        const url = `${this.baseUrl}/api/account/Register`
        var dataUser = this.http.post(url, RegisterNewUser, httpOptions)
        return dataUser
            .pipe(
                catchError(this.handleError)
            );
    }

    // Login User 
    AuthentificationUser(Authentification: Authentification) {
        const url = `${this.baseUrl}/api/authenticate`
        var dataUser = this.http.post(url, Authentification, httpOptions)
        return dataUser
            .pipe(
                catchError(this.handleError)
            );
    }
    // Add house API
    SaveHouse(AddHouse: AddHouse) {
        const url = `${this.baseUrl}/api/house/SaveHouse`
        var dataUser = this.http.post(url, AddHouse, httpOptions)
        return dataUser
            .pipe(
                catchError(this.handleError)
            );
    }
    //  Get saved houses
    GetHousesSaved() {
        const url = `${this.baseUrl}/api/house/GetHouses`
        var dataUser = this.http.get(url, httpOptions)
        return dataUser
            .pipe(
                catchError(this.handleError)
            );
    }
    // getRegistersUsers
    getRegisteredUser() {
        const url = `${this.baseUrl}/api/account/GetUsers`
        var dataUser = this.http.get(url, httpOptions)
        console.log(dataUser)
        return dataUser
            .pipe(
                catchError(this.handleError)
            );
    }

    // getRegistersUsers
    getHouseDetailsWithImages(houseID:any) {
        const url = `${this.baseUrl}/api/house/GetHouseDetails?ID=` + houseID
        var dataUser = this.http.get(url, httpOptions)
        console.log(dataUser)
        return dataUser
            .pipe(
                catchError(this.handleError)
            );
    }


    // Delete house and all images 
    DeleteHouse(ID: any) {
        const url = `${this.baseUrl}/api/house/DeleteHouse?ID=` + ID
        var dataUser = this.http.get(url, httpOptions)
        return dataUser
            .pipe(
                catchError(this.handleError)
            );
    }
    // Delete images of house
    DeleteHouseImages(ID: any) {
        const url = `${this.baseUrl}/api/house/DeleteHouseImage?ID=` + ID
        var dataUser = this.http.get(url, httpOptions)
        return dataUser
            .pipe(
                catchError(this.handleError)
            );
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';
        return throwError(errorRes);
    }
}


import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { throwError } from 'rxjs'
import { catchError } from 'rxjs/operators';
import { ConfigService } from '../providers/config'
import { RegisterNewUser } from 'src/models/RegisterNewUser.model';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable()
export class HouseholdProvider {
    private readonly baseUrl!: string;
    private RegisterNewUser!:RegisterNewUser
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
    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';
        return throwError(errorRes);
    }
}

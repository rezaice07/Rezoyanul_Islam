import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { CurrentLoggedInUser } from '../../models/global/current-loggedin-user-model';
import { ApiLoginResponse, LoginResponse } from '../../models/global/login-response.model';
import { AppConstants } from '../../models/global/global-constant';
import { StorageService } from '../storage/storage.service';


@Injectable()
export class AuthenticationApi {
    currentLoggedInUser: CurrentLoggedInUser = <any>{};
    loginResponce: LoginResponse = <any>{};
    apiLoginResponse: ApiLoginResponse = <any>{};

    constructor(private http: HttpClient
    ) { }

    validateLogin(username, password): Observable<any> {
        let headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        let options = new HttpHeaders(headers);
        var params = "username=" + username + "&password=" + password + "&grant_type=password";

        return this.http.post<any>(`${AppConstants.BASE_URL}/api/account/login`, params, { headers: options })
            .pipe(
                tap(
                    data => {
                        data
                    },
                    error => {
                        console.log(`${error.status}`);                        
                    }
                )
            );
    }


    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
        } else {
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        return throwError('Something bad happened; please try again later.');
    };

    private getHeader(token: string): HttpHeaders {
        let headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token };
        let options = new HttpHeaders(headers);
        return options;
    }    

    private getFileUploadHeader(token: string): HttpHeaders {
        let headers = { 'Data-Type': 'json', 'Authorization': 'Bearer ' + token };
        let options = new HttpHeaders(headers);
        return options;
    }
}

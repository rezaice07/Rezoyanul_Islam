import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AppConstants } from '../shared/models/global/global-constant';
import { LoginResponse } from '../shared/models/global/login-response.model';
import { StorageService } from '../shared/services/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  loginResponse: LoginResponse = <any>{};
  constructor(public storageService: StorageService, public router: Router) {}
  canActivate(): Promise<boolean> {
    return new Promise(resolve => {
      this.storageService
        .get(AppConstants.LOGIN_RESPONSE)
        .then(res => {
           this.loginResponse=res;              
           console.log(`Guard: ${this.loginResponse.isSuccess}`);           
          if (this.loginResponse.isSuccess) {
            resolve(true);
          } else {
            this.router.navigate(['login']);
            resolve(false);
          }
        })
        .catch(err => {
          resolve(false);
        });
    });
  }
}

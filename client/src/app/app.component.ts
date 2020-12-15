import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from './shared/models/global/global-constant';
import { LoginResponse } from './shared/models/global/login-response.model';
import { UtilityService } from './shared/services/authentication/utility.service';
import { StorageService } from './shared/services/storage/storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Feedback Collection';
  loginResponse: LoginResponse = <any>{};
  subscription: Subscription;

  constructor(
    private storageService: StorageService,
    private utilityService: UtilityService,
    private router: Router,
  ) {

    this.subscription = this.utilityService.onLoggedIn().subscribe(response => {
      if (response) {
        this.loginResponse.isSuccess = response;
      } else {
        this.loginResponse.isSuccess = false;
      }
      //this.getLoginDetails();
    });
  }
  private logout() {
    this.storageService.clear();
    this.router.navigate([`./login`]);
  }

  private getLoginDetails() {
    this.storageService
      .get(AppConstants.LOGIN_RESPONSE)
      .then(res => {
        if (res)
          this.loginResponse = res;
      }).catch(err => { });
  }

}

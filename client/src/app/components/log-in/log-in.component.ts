import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CurrentLoggedInUser } from 'src/app/shared/models/global/current-loggedin-user-model';
import { AppConstants } from 'src/app/shared/models/global/global-constant';
import { LoginResponse } from 'src/app/shared/models/global/login-response.model';
import { AuthenticationApi } from 'src/app/shared/services/authentication/authentication-api.service';
import { UtilityService } from 'src/app/shared/services/authentication/utility.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  username: string = '';
  password: string = '';
  loginResponse: LoginResponse = <any>{};
  currentLoggedInUser: CurrentLoggedInUser = <any>{};
  
  constructor(private toastr: ToastrService,
    private router:Router,
     private utilityService:UtilityService,
    private authenticationApi: AuthenticationApi,
    private storageService: StorageService
    ) {

  }
 
  ngOnInit(): void {
    
  }

  login() { 

    this.authenticationApi.validateLogin(this.username, this.password).subscribe(data => {
        if (data.isSuccess && data.access_token.length > 0) {
            this.loginResponse.isSuccess = true;
            this.loginResponse.message = 'Success, Login successful!';
            this.loginResponse.token = data.access_token;
            this.loginResponse.userId = data.user.id;
            this.currentLoggedInUser=data.user;

            //clear storage data
            this.storageService.clear();

            // lets store user details into local storage
            this.storageService.store(AppConstants.LOGIN_RESPONSE, this.loginResponse);
            this.storageService.store(AppConstants.CURRENT_LOGGED_IN_USERKEY, this.currentLoggedInUser)
            this.router.navigate([`./feedback-report`]); 
             
            this.utilityService.clearUtilites();
            this.utilityService.sendLoggedInInfo(this.loginResponse.isSuccess);          
        }
        else {
            this.loginResponse.isSuccess = false;
            this.loginResponse.message = 'Warning, Incorrect username or password';
            this.notificationPrompt(this.loginResponse.message);
        }
        
    }, err => {       
      let message="There was an error while trying to login!";
        this.notificationPrompt(message);
    });
  }

  private notificationPrompt(message:any) {
    this.toastr.warning(message);
  }
}

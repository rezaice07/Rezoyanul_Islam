import { BrowserModule } from '@angular/platform-browser';

/* Routing */
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

/* Angular Material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

/* FormsModule */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* Angular Flex Layout */
import { FlexLayoutModule } from "@angular/flex-layout";

/* Toaster */
import { ToastrModule, ToastrService } from 'ngx-toastr';

import {NgxWebstorageModule} from 'ngx-webstorage';

/* Components */
import { LogInComponent } from './components/log-in/log-in.component';
import { FeedbackCollectionReportComponent } from './components/feedback-collection-report/feedback-collection-report.component';
import { AuthenticationApi } from './shared/services/authentication/authentication-api.service';
import { StorageService } from './shared/services/storage/storage.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PostService } from './shared/services/posts/post-api.service';


@NgModule({
  declarations: [
    AppComponent,   
    LogInComponent, FeedbackCollectionReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),  
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [AuthenticationApi,PostService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule { }
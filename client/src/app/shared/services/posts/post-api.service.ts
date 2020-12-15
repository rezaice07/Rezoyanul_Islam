import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import 'rxjs';
import { Observable, throwError } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { AppConstants } from '../../models/global/global-constant';
import { GlobalBaseResponse } from '../../models/global/global-base-response.model';

@Injectable()
export class PostService {    
    costingDetail = <any>{};
    globalBaseResponse: GlobalBaseResponse = <any>{};

    constructor(private http: HttpClient
    ) { }    

    getPostByFilter(token: string, searchFilter: any): Observable<any> {
        let options = this.getHeader(token);
        return this.http.post<any>(`${AppConstants.BASE_API_URL}/post/getpostsbyfilter`, JSON.stringify(searchFilter), { headers: options })
            .pipe(
                tap(
                    data => {
                         //console.log(`${data.join()}`);
                    },
                    error => {
                        console.log(`${error}`);
                    }
                )
            );
    }

    commentVotting(token: string, commentVoting: any): Observable<GlobalBaseResponse> {
        let options = this.getHeader(token);       
        return this.http.post<GlobalBaseResponse>(`${AppConstants.BASE_API_URL}/post/commentvotting`, JSON.stringify(commentVoting), { headers: options })
            .pipe(
                tap(
                    data => {
                        //console.log(`${data}`);
                    },
                    error => {
                        console.log(`${error}`);
                    }
                )
            );
    }
        
    private getHeader(token: string): HttpHeaders {
        let headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token };
        let options = new HttpHeaders(headers);
        return options;
    }
}

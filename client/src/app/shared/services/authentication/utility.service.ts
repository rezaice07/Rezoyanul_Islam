import { Injectable } from '@angular/core';
import { StorageService } from 'ngx-webstorage/lib/core/interfaces/storageService';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UtilityService {
    private subject = new Subject<any>();

    sendLoggedInInfo(isSuccess: boolean) {
        this.subject.next({ text: isSuccess });
    }

    clearUtilites() {
        this.subject.next();
    }

    onLoggedIn(): Observable<any> {
        return this.subject.asObservable();
    }
}
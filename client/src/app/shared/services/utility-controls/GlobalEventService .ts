import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GlobalEventService  {

    private eventSubject = new Subject<any>();

    publish(data: any) {
        this.eventSubject.next(data);
    }

    fetch(): Subject<any> {
        return this.eventSubject;
    }
}
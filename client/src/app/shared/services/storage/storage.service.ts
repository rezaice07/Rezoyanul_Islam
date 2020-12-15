import { Injectable } from '@angular/core';
import {LocalStorageService} from 'ngx-webstorage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private storage:LocalStorageService) {}

  // Store the value
  async store(storageKey: string, value: any) {
    const encryptedValue = btoa(escape(JSON.stringify(value)));
    await this.storage.store(storageKey,encryptedValue);
  }

  // Get the value
  async get(storageKey: string) {
    const ret = await this.storage.retrieve( storageKey);
    if (ret) {
      return JSON.parse(unescape(atob(ret)));
    } else {
      return null;
    }
  }  

  async removeItem(storageKey: string) {
    await this.storage.clear(storageKey);
  }

  async clear() {
    await this.storage.clear();
  }  

 
}

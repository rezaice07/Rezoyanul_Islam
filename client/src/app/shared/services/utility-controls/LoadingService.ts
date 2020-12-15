//references
//https://stackoverflow.com/questions/52574448/ionic-4-loading-controller-dismiss-is-called-before-present-which-will-ke

import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {

    isLoading = false;

    constructor(public loadingController: LoadingController) { }

    async present(msg,duration=0) {
        this.isLoading = true;
        return await this.loadingController.create({
            spinner: "crescent",
            message: `${msg}`,
            duration: duration,
        }).then(a => {
            a.present().then(() => {                
                if (!this.isLoading) {
                    a.dismiss().then(() => {
                        
                    });
                }
            });
        });
    }

    async dismiss() {
        this.isLoading = false;
        return await this.loadingController.dismiss().then(() => {
            //console.log('dismissed')
        });
    }
}
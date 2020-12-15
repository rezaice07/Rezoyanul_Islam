import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ToastTypeConstants } from '../../shared';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(public toastController: ToastController) { }

  async presentToast(infoMessage: string, type: string=ToastTypeConstants.Success) {
    const toast = await this.toastController.create({
      message: infoMessage,
      duration: 2500,
      color: type,      
    });
    toast.present();
  }
}

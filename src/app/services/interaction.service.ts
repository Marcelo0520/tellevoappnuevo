import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  loading:any;

  constructor(public loadingController: LoadingController) {}

  async presentLoading(mensaje:string){
    this.loading = await this.loadingController.create({
      cssClass:'customclass', 
      message: mensaje,
    });
    await this.loading.present();
  }

  async closeLoading(){
    await this.loading.dismiss();    
  }

}

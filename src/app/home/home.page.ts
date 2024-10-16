import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastController } from '@ionic/angular';  // Importa ToastController
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  login:boolean = false;

  constructor(private auth:AuthService,
              private toastController: ToastController,
              private router: Router,
            ) {
              this.auth.stateUser().subscribe(res => {
                if(res){
                  console.log(`Usuario ${res.email} está logeado`);
                  this.login=true
                }else{
                  console.log('No está logeado');
                  this.login = false;
                }
              })
            }

  async showToast(message: string, color:string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1000, 
      position: 'bottom',
      color: color, 
    });
    toast.present();
  }

  logout(){
    this.auth.logout();
    this.showToast('Sesión finalizada','success')
    this.router.navigate(['/login']);
    console.log('usuario deslogeado');
    
  }


}

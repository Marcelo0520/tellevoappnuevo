import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-resetpass',
  templateUrl: './resetpass.page.html',
  styleUrls: ['./resetpass.page.scss'],
})
export class ResetpassPage implements OnInit {

  public email:string = "";

  constructor(private toastController: ToastController,private router: Router,private authService:AuthService) { }

  ngOnInit() {
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

  sendLinkReset(){
    if(this.email != ""){
      this.authService.resetPassword(this.email).then(()=>{
        this.showToast('El correo ha sido enviado con éxito','success')
        this.router.navigate(['/login']);
        
      }).catch(()=>{
        this.showToast('Ingrese un correo válido','danger')
      })
    }else{
      this.showToast('Las intrucciones han sido claras','danger')
    }

    
  }

}

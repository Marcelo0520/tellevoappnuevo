import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';  // Importa ToastController
import { AuthService } from '../services/auth.service';
import { InteractionService } from '../services/interaction.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor( 
    private router: Router,
    private toastController: ToastController,
    private auth:AuthService,
    private interaction:InteractionService ) 
    { }
    
   
  ngOnInit() {
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  icono = "oscuro"
  isModalOpen = false;

  credenciales = {
    correo:"",
    password:""
  }

  async login(){
    await this.interaction.presentLoading('Ingresando...')
    console.log('credenciales -> ', this.credenciales);
    const res = await this.auth.login(this.credenciales.correo,this.credenciales.password).catch(error =>
    {
      console.log('error');
      this.interaction.closeLoading()

      this.showToast(`Email o contraseña inválidos`,'danger')
      return
    }
    )
  
    if(res){
      console.log('res -> ',res);
      this.interaction.closeLoading()
      this.showToast(`Bienvenido/a ${res.user?.email}!.`,'success')
      this.credenciales.correo = '';
      this.credenciales.password = '';
      this.router.navigate(['/home']);
      return
    }
  }

  cambiarTema() {
    if (this.icono == "oscuro") {
      document.documentElement.style.setProperty("--backlogin", "#1a1a1a");
      document.documentElement.style.setProperty("--textlogin", "#ffffff");
      document.documentElement.style.setProperty("--boxshadow", "#FFB80075");

      this.icono = "claro"
    } else {
      document.documentElement.style.setProperty("--backlogin", "#fff");
      document.documentElement.style.setProperty("--textlogin", "#1a1a1a");
      document.documentElement.style.setProperty("--boxshadow", "#1a1a1a75");
      this.icono = "oscuro"
    }
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
  
 /* login() {
    for (let u of this.usuarios) {
      if (u.email == this.email && u.clave == this.clave) {
        this.showToast(`Bienvenido/a ${u.nombre}!.`,'success')
        this.email = '';
        this.clave = '';
        this.router.navigate(['/home']);
        return
      }else{
        this.showToast(`El usuario no se encuentra registrado!`,'danger')
      }
    }
    console.log("Datos incorrectos!, te queda(n) 1 intento(s).")
  }*/
 
  /*async resetPass() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
    });
    loading.present()
    for (let u of this.usuarios) {
      if (u.email == this.email) {
        let nueva = Math.random().toString(36).slice(-6)
        u.clave = nueva
        let body = {
          "nombre": u.nombre,
          "app": "TeLlevoApp",
          "clave": nueva,
          "email": u.email
        }
        this.http.post("https://myths.cl/api/reset_password.php", body)
        .subscribe((data)=>{
          console.log(data)
          loading.dismiss()
        })
        return
      }
    }
    console.log("Usuario no encontrado!.")
  }*/

  
}

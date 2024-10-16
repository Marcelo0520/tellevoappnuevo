import { Component, OnInit } from '@angular/core';
import { UserI } from '../models/models';
import { AuthService } from '../services/auth.service';
import { ToastController } from '@ionic/angular';
import { FirestoreService } from '../services/firestore.service';
import { InteractionService } from '../services/interaction.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  icono="oscuro"

  datos: UserI = {
    usuario:"",
    correo:"",
    id:"",
    password:""
  }

  constructor(private router: Router,
              private auth: AuthService,
              private toastController: ToastController,
              private firestore: FirestoreService,
              private interaction:InteractionService
             ) {}

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

  async registrar() {
    this.interaction.presentLoading('Registrando...');
    console.log('datos ->', this.datos);
  
    try {
      const res = await this.auth.registarUser(this.datos);
      
      if (res) {
        const path = 'Usuarios';
        const id = res.user?.uid;
  
        // Validar que el ID no sea undefined
        if (id) {
          this.datos.id = id;
          await this.firestore.creatDoc(this.datos, path, id);
          this.showToast(`Felicidades, registrado con éxito`, 'success');
          this.datos.correo = ""
          this.datos.password = ""
          this.datos.usuario = ""
          this.router.navigate(['/home']);
        } else {
          console.error('Error: El ID del usuario es undefined');
          this.showToast('Error al obtener el ID del usuario', 'danger');
        }
      }
    } catch (error) {
      console.log('Error:', error);
      this.showToast('Error al registrarse', 'danger');
    } finally {
      this.interaction.closeLoading();
    }
  }
  
}

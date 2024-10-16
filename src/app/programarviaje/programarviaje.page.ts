import { Component, OnInit } from '@angular/core';
import { ViajeI } from '../models/viajes';
import { FirestoreService } from '../services/firestore.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-programarviaje',
  templateUrl: './programarviaje.page.html',
  styleUrls: ['./programarviaje.page.scss'],
})
export class ProgramarviajePage implements OnInit {

    viaje: ViajeI = {
    conductorId: '',
    conductorNombre: '',
    destino: '',
    capacidad: 0,
    costo: 0,
    fechaHora: null,
    pasajeros:[]
  };

  constructor(private firestore: FirestoreService, 
              private auth: AngularFireAuth, 
              private toastController: ToastController,
              private router: Router,) 
              {}

  ngOnInit() {
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'bottom',
    });
    toast.present();
  }

  async programarViaje() {
    const user = await this.auth.currentUser;
    if (user) {
      this.viaje.conductorId = user.uid;
      this.viaje.conductorNombre = this.viaje.conductorNombre || 'Conductor';  // Puedes ajustar para usar un nombre real

      const path = 'Viajes';
      const id = this.firestore.getId();  // Genera un ID para el viaje
      this.viaje.id = id;

      try {
        await this.firestore.creatDoc(this.viaje, path, id);
        this.showToast('Viaje programado con éxito', 'success');
        this.router.navigate(['/viajes']);
      } catch (error) {
        this.showToast('Error al programar el viaje', 'danger');
        console.error('Error al programar el viaje:', error);
      }
    }
  }

}

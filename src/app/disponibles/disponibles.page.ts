import { Component, OnInit } from '@angular/core';
import { ViajeI } from '../models/viajes';
import { FirestoreService } from '../services/firestore.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-disponibles',
  templateUrl: './disponibles.page.html',
  styleUrls: ['./disponibles.page.scss'],
})
export class DisponiblesPage implements OnInit {

  viajesDisponibles: ViajeI[] = [];


  constructor(private router: Router,
              private firestore: FirestoreService, 
              private auth: AngularFireAuth,
              private toastController: ToastController) {
    this.obtenerViajes();
   }

  ngOnInit() {
  }

  obtenerViajes() {
    const path = 'Viajes';
    const fechaActual = new Date(); 
    this.firestore.getCollection<ViajeI>(path).subscribe(viajes => {
      this.viajesDisponibles = viajes;
      this.viajesDisponibles = this.viajesDisponibles.filter((viaje: any) => {
        const fechaViaje = new Date(viaje.fechaHora);  // Convierte la fecha del viaje a un objeto Date
        return fechaViaje > fechaActual;  // Mantén solo los viajes cuya fecha es mayor a la actual
      });
    });
  }

  async solicitarViaje(viaje: ViajeI) {
    const user = await this.auth.currentUser;
    if (user) {
      if (!viaje.pasajeros) {
        viaje.pasajeros = [];
      }
      
      // Verificar si el viaje tiene un id definido
      if (!viaje.id) {
        console.error('El viaje no tiene un id definido.');
        return; // No continúa si no hay un id
      }
  
      viaje.pasajeros.push(user.uid);  // Agrega al usuario a la lista de pasajeros
      const path = 'Viajes';
      await this.firestore.creatDoc(viaje, path, viaje.id);  // Aquí ya se asegura que id no es undefined
      this.showToast('Solicitud enviada', 'success');
    }
  }


  hayCapacidad(viaje: ViajeI): boolean {
    return viaje.capacidad > (viaje.pasajeros?.length || 0);
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

  verDetalles(viajeId: string) {
    this.router.navigate(['/detalleviaje', viajeId]);  // Asegúrate de que el ID se pase correctamente
  }  
  
}

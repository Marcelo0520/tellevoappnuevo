import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  usuario: any = {};
  viajes: any[] = [];
  viajesComoPasajero: any[] = [];
  login:boolean = false;


  constructor(private firestore: FirestoreService, private auth: AuthService) {
    this.auth.stateUser().subscribe(res => {
      if(res){
        console.log(`Usuario ${res.displayName || res.email} está logeado`);
        this.login=true
      }else{
        console.log('No está logeado');
        this.login = false;
      }
    })
  }

  async ngOnInit() {
    const uid = await this.auth.getUid();  
    const id= await this.auth.getUid();
  
    if (uid) {
      this.firestore.getDoc(`Usuarios`, uid).subscribe(userInfo => {
        console.log('Información del usuario:', userInfo);  
        this.usuario = userInfo;
      });
  
      this.firestore.getCollectionByQuery('Viajes', 'conductorId','==', uid).subscribe(viajes => {
        console.log('Viajes realizados:', viajes);  
        this.viajes = viajes;
      });

      this.firestore.getCollectionByQuery('Viajes', 'pasajeros', 'array-contains', uid).subscribe(viajesComoPasajero => {
        console.log('Viajes realizados como pasajero:', viajesComoPasajero);  
        this.viajesComoPasajero = viajesComoPasajero; 
      });
    }
  }
  
}

import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ViajeI } from '../models/viajes';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../services/firestore.service';
import { Platform } from '@ionic/angular';

declare var google: any;

@Component({
  selector: 'app-detalleviaje',
  templateUrl: './detalleviaje.page.html',
  styleUrls: ['./detalleviaje.page.scss'],
})
export class DetalleviajePage implements OnInit {

  viaje: ViajeI | undefined;
  

  constructor(
    private route: ActivatedRoute,
    private firestore: FirestoreService,
    private platform: Platform,
    private zone: NgZone
  ) {}


  //Lista para guardar los pasos a seguir de la ruta
  public steps: any[] = [];  
  autocompleteItems!: any[];
  distancia = '';
  duracion = '';
  @ViewChild('map') mapElement: ElementRef | undefined;
  public map: any;
  public start: any = 'Duoc UC: Sede Melipilla - Serrano, Melipilla, Chile';
  public end: any = '';
  public directionsService: any;
  public directionsDisplay: any;

  ngOnInit() {
    const viajeId = this.route.snapshot.paramMap.get('id');
    if (viajeId) {
      this.obtenerDetallesViaje(viajeId);
    }
  }

  ionViewDidEnter(){
    const viajeId = this.route.snapshot.paramMap.get('id');
    if (viajeId) {
      this.obtenerDetallesViaje(viajeId);
    }
  }

  obtenerDetallesViaje(id: string) {
    const path = 'Viajes';
    this.firestore.getDoc<ViajeI>(path, id).subscribe((viaje) => {
      this.viaje = viaje; 
      this.initMap(); 
    });
  }

  initMap() {
    this.directionsService = new google.maps.DirectionsService;
    this.directionsDisplay = new google.maps.DirectionsRenderer;
    let mapOptions = {
     zoom: 5,
     zoomControl: true,
     scaleControl: true,
     mapTypeControl: true,
     streetViewControl: false,
     fullscreenControl: true,
     mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    this.map = new google.maps.Map(this.mapElement!.nativeElement, mapOptions);
    let infoWindow = new google.maps.InfoWindow();   
    if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
       const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
       };
       // new google.maps.Marker({
   
       //  position: pos,
   
       //  map: this.map,
   
       // });
       infoWindow.setPosition(pos);
       infoWindow.setContent("Estas aquí.");
       infoWindow.open(this.map);
       this.map.setCenter(pos);
      }
     );
    }
    this.directionsDisplay.setMap(this.map);
    this.calculateAndDisplayRoute();
   }

   calculateAndDisplayRoute() {
   
    this.directionsService.route({
   
     origin: this.start,
   
     destination: this.end = this.viaje?.destino ? this.viaje.destino + ', Chile' : '',
   
     travelMode: 'DRIVING'
   
    }, (response: any, status: string) => {
   
     if (status === 'OK') {

      this.directionsDisplay.setDirections(response);
      const route = response.routes[0];
      const leg = route.legs[0];
   
      // Distancia total
      const distanceInKilometers = (leg.distance.value / 1000).toFixed(2);
      console.log(`Distancia: ${distanceInKilometers} km`);
      this.distancia = `${distanceInKilometers} km`;
   
      // Tiempo de viaje
      const durationInSeconds = leg.duration.value;
      const minutes = Math.floor(durationInSeconds / 60); // minutos
      const seconds = durationInSeconds % 60; // segundos
      const formattedDuration = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      console.log(`Duración: ${formattedDuration} (mm:ss)`);
      this.duracion = `${formattedDuration}`;
   
      // Información sobre origen y destino
      console.log(`Inicio: ${leg.start_address}`);
      console.log(`Destino: ${leg.end_address}`);

      // Tiempo de viaje en tráfico
      if (leg.duration_in_traffic) {
   
       const durationInTraffic = leg.duration_in_traffic.value / 60;
   
       console.log(`Tiempo de viaje en tráfico: ${durationInTraffic} minutos`);
   
      }
   
      // Detalles de los pasos
      this.steps = leg.steps.map((step: any, index: number) => {
        console.log(step.instructions)
        return {
          instruction: step.instructions.replace(/<\/?[^>]+(>|$)/g, ""), // Instrucción del paso
          distance: (step.distance.value / 1000).toFixed(2), // Distancia en km
          duration: Math.floor(step.duration.value / 60)  // Duración en minutos
        };
      }); 
   
   
     } else {
   
      window.alert('Directions request failed due to ' + status);
   
     }
   
    });
   
   }
   
   
   
   updateSearchResults() {
   
    let GoogleAutocomplete = new google.maps.places.AutocompleteService();
   
    if (this.end == '') {
   
     this.autocompleteItems = [];
   
     return;
   
    }
   
    GoogleAutocomplete!.getPlacePredictions({ input: this.end },
   
     (predictions: any, status: any) => {
   
      this.autocompleteItems = [];
   
      this.zone.run(() => {
   
       predictions.forEach((prediction: any) => {
   
        this.autocompleteItems!.push(prediction);
   
       });
   
      });
   
     });
   
   }
   
   selectSearchResult(item: any) {
   
    this.end = item.description
   
    this.autocompleteItems = []
   
    this.initMap()
   
   }
   
   
}

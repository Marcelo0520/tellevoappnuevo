import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.page.html',
  styleUrls: ['./viajes.page.scss'],
})
export class ViajesPage implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit() {
  }

  goToProgramarViaje() {
    this.router.navigate(['/programarviaje']);
  }
  
  goToVerViajes() {
    this.router.navigate(['/disponibles']);
  }  

}

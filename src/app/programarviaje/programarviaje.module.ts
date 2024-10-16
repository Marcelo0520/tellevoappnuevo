import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProgramarviajePageRoutingModule } from './programarviaje-routing.module';

import { ProgramarviajePage } from './programarviaje.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProgramarviajePageRoutingModule
  ],
  declarations: [ProgramarviajePage]
})
export class ProgramarviajePageModule {}

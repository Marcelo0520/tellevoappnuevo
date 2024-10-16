import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProgramarviajePage } from './programarviaje.page';

const routes: Routes = [
  {
    path: '',
    component: ProgramarviajePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProgramarviajePageRoutingModule {}

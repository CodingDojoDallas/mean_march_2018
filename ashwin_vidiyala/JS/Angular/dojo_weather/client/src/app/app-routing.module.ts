import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DallasComponent }      from './dallas/dallas.component';
import { SeattleComponent }     from './seattle/seattle.component';
import { SanJoseComponent }     from './san-jose/san-jose.component';
import { BurbankComponent }     from './burbank/burbank.component';
import { ChicagoComponent }     from './chicago/chicago.component';

const routes: Routes = [
  { path: '',        component: DallasComponent },
  { path: 'dallas',  component: DallasComponent },
  { path: 'seattle', component: SeattleComponent },
  { path: 'sanjose', component: SanJoseComponent },
  { path: 'burbank', component: BurbankComponent },
  { path: 'chicago', component: ChicagoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

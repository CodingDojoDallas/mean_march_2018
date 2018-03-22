import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShintoHomeComponent }  from './shinto/shinto-home/shinto-home.component';
import { ShintoMineComponent }  from './shinto/shinto-mine/shinto-mine.component';
import { ShintoBuyComponent }   from './shinto/shinto-buy/shinto-buy.component';
import { ShintoSellComponent }  from './shinto/shinto-sell/shinto-sell.component';
import { ShintoLedgerComponent} from './shinto/shinto-ledger/shinto-ledger.component';
import { ShintoShowComponent }  from './shinto/shinto-show/shinto-show.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home',     component: ShintoHomeComponent },
  { path: 'mine',     component: ShintoMineComponent },
  { path: 'buy',      component: ShintoBuyComponent  },
  { path: 'sell',     component: ShintoSellComponent },
  { path: 'ledger',   component: ShintoLedgerComponent},
  { path: 'show/:id', component: ShintoShowComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

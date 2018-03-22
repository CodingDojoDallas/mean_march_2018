import { BrowserModule }       from '@angular/platform-browser';
import { NgModule }            from '@angular/core';
import { HttpModule }          from '@angular/http';
import { FormsModule }         from '@angular/forms';

import { ShintoService }       from './shinto.service';

import { AppRoutingModule }    from './app-routing.module';

import { AppComponent }        from './app.component';
import { ShintoComponent }     from './shinto/shinto.component';
import { ShintoHomeComponent } from './shinto/shinto-home/shinto-home.component';
import { ShintoMineComponent } from './shinto/shinto-mine/shinto-mine.component';
import { ShintoBuyComponent } from './shinto/shinto-buy/shinto-buy.component';
import { ShintoSellComponent } from './shinto/shinto-sell/shinto-sell.component';
import { ShintoLedgerComponent } from './shinto/shinto-ledger/shinto-ledger.component';
import { ShintoShowComponent } from './shinto/shinto-show/shinto-show.component';


@NgModule({
  declarations: [
    AppComponent,
    ShintoComponent,
    ShintoHomeComponent,
    ShintoMineComponent,
    ShintoBuyComponent,
    ShintoSellComponent,
    ShintoLedgerComponent,
    ShintoShowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule
  ],
  providers: [ShintoService],
  bootstrap: [AppComponent]
})
export class AppModule { }

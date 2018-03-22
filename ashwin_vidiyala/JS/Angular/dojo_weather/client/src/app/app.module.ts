import { BrowserModule }    from '@angular/platform-browser';
import { NgModule }         from '@angular/core';
import { WeatherService }   from './weather.service';
import { HttpModule }       from '@angular/http';
import { FormsModule }      from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent }     from './app.component';
import { DallasComponent }  from './dallas/dallas.component';
import { SeattleComponent } from './seattle/seattle.component';
import { SanJoseComponent } from './san-jose/san-jose.component';
import { BurbankComponent } from './burbank/burbank.component';
import { ChicagoComponent } from './chicago/chicago.component';


@NgModule({
  declarations: [
    AppComponent,
    DallasComponent,
    SeattleComponent,
    SanJoseComponent,
    BurbankComponent,
    ChicagoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule
  ],
  providers: [WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule }  from '@angular/platform-browser';
import { NgModule }       from '@angular/core';
import { PokemonService } from './pokemon.service';
import { HttpModule }     from '@angular/http';

import { AppComponent }   from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [PokemonService],
  bootstrap: [AppComponent]
})
export class AppModule { }

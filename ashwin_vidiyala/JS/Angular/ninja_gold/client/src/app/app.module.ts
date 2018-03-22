import { BrowserModule }  from '@angular/platform-browser';
import { NgModule }       from '@angular/core';
import { NinjaService }   from './ninja.service';
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
  providers: [NinjaService],
  bootstrap: [AppComponent]
})
export class AppModule { }

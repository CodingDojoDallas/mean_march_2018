import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpService } from './http.service';   // register the service
import { HttpModule } from '@angular/http'; // setup client to fetch data from database
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';  // bring in forms module


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, // register with app
    HttpModule  // setup client to fetch data from database
  ],
  providers: [HttpService], // register the service
  bootstrap: [AppComponent]
})
export class AppModule { }

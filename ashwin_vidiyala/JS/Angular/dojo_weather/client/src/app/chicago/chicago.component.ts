import { Component, OnInit } from '@angular/core';
import { WeatherService }    from '../weather.service';

@Component({
  selector: 'app-chicago',
  templateUrl: './chicago.component.html',
  styleUrls: ['./chicago.component.css']
})
export class ChicagoComponent implements OnInit {
  dallas: {};
  name: String;
  humidity: Number;
  temperature_average;
  temperature_high;
  temperature_low;
  status;

  constructor(private _weatherService: WeatherService) { }

  ngOnInit() {
    this.getChicagoWeather();
  }

  getChicagoWeather() {
    let observable = this._weatherService.getChicagoWeather();
    observable.subscribe( (data) => {
      const city = data.json();
      this.name = city['name'];
      this.humidity = city['main']['humidity'];
      this.temperature_average = city['main']['temp'];
      this.temperature_high = city['main']['temp_max'];
      this.temperature_low = city['main']['temp_min'];
      this.status = city['weather'][0]['description'];
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { WeatherService }    from '../weather.service';

@Component({
  selector: 'app-dallas',
  templateUrl: './dallas.component.html',
  styleUrls: ['./dallas.component.css']
})
export class DallasComponent implements OnInit {
  dallas: {};
  name: String;
  humidity: Number;
  temperature_average;
  temperature_high;
  temperature_low;
  status;

  constructor(private _weatherService: WeatherService) { }

  ngOnInit() {
    this.getDallasWeather();
  }

  getDallasWeather() {
    let observable = this._weatherService.getDallasWeather();
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

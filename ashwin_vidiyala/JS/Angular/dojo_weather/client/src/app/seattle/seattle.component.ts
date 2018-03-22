import { Component, OnInit } from '@angular/core';
import { WeatherService }    from '../weather.service';

@Component({
  selector: 'app-seattle',
  templateUrl: './seattle.component.html',
  styleUrls: ['./seattle.component.css']
})
export class SeattleComponent implements OnInit {
  dallas: {};
  name: String;
  humidity: Number;
  temperature_average;
  temperature_high;
  temperature_low;
  status;

  constructor(private _weatherService: WeatherService) { }

  ngOnInit() {
    this.getSeattleWeather();
  }

  getSeattleWeather() {
    let observable = this._weatherService.getSeattleWeather();
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

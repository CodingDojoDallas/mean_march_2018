import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';

@Injectable()
export class WeatherService {

  constructor(private _http: Http) { }

  getDallasWeather() {
    return this._http.get('http://api.openweathermap.org/data/2.5/weather?q=Dallas&APPID=d63a56c5ee8fd2af7c8e6ca176244b1e');
  }

  getSeattleWeather() {
    return this._http.get('http://api.openweathermap.org/data/2.5/weather?q=Seattle&APPID=d63a56c5ee8fd2af7c8e6ca176244b1e');
  }

  getSanJoseWeather() {
    return this._http.get('http://api.openweathermap.org/data/2.5/weather?q=San+Jose&APPID=d63a56c5ee8fd2af7c8e6ca176244b1e');
  }

  getBurbankWeather() {
    return this._http.get('http://api.openweathermap.org/data/2.5/weather?q=Burbank&APPID=d63a56c5ee8fd2af7c8e6ca176244b1e');
  }

  getChicagoWeather() {
    return this._http.get('http://api.openweathermap.org/data/2.5/weather?q=Chicago&APPID=d63a56c5ee8fd2af7c8e6ca176244b1e');
  }
}

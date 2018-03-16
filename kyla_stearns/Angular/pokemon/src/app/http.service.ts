import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) {
  	this.getPokemon();
  	this.getAbility();
  }
  	getPokemon(){
	  	let snorlax = this._http.get('https://pokeapi.co/api/v2/pokemon/143/');
	  	snorlax.subscribe((data: any) => 
		  	console.log(`Snorlax has an ability called ${data.abilities[2].ability.name}`, data));
  	}
  	getAbility(){
  		let immunity = this._http.get('https://pokeapi.co/api/v2/ability/17/');
  		immunity.subscribe((data: any) =>
  			console.log(`${data.pokemon.length-1} others have this ability! ${data.pokemon[1].pokemon.name} and ${data.pokemon[2].pokemon.name}`, data));
  	}
}
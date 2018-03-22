import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';

@Injectable()
export class PokemonService {

  constructor(private _http: Http) {
    this.getPokemon();
  }

  getPokemon() {
    let pokemon = this._http.get('https://pokeapi.co/api/v2/pokemon/1/');
    pokemon.subscribe( (data) => {
      let pokemon_data = data.json();
      let pokemon_abilities = pokemon_data.abilities;
      let pokemon_name = pokemon_data.forms[0].name;
      // console.log(pokemon_data);
      // console.log(`These are ${pokemon_name}'s abilities:`);
      for (let i = 0; i < pokemon_abilities.length; i++ ) {
        // console.log(`Ability #${i+1}: ${pokemon_abilities[i].ability.name}`);
      }
      console.log(`Number of pokemon that share ${pokemon_name}'s abilities:`);
      let list_of_pokemon = this._http.get(`${pokemon_abilities[0].ability.url}`);
      list_of_pokemon.subscribe( (list) => {
        console.log(list.json().pokemon.length);
      })
    })
  }
}

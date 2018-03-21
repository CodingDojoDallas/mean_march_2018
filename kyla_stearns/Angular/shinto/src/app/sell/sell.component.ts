import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {
  transaction = {amount: 0, id: ""};
  coinSell: any;
  owned: number = 0;
  currentValue: number = 0;
  constructor(private _httpService: HttpService){
  }

  ngOnInit() {
  	this.owned = this._httpService.totalOwned;
  	this.coinSell = {sold: 0};
  	this.currentValue = this._httpService.value;
  }

  onSell(event){
  	event.preventDefault();
  	// console.log("information from sell form", this.coinSell);
  	let observable = this._httpService.sellCoins(this.coinSell.sold);
  	// console.log("received back from service with sold amount", observable);
  	this.owned = this._httpService.totalOwned;
  	this.currentValue = this._httpService.value;
    this.coinSell.sold = 0;
  }
}




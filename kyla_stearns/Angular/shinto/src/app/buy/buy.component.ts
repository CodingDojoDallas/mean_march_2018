import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {
  coinBuy: any;
  owned: number = 0;
  currentValue: number = 0;

  constructor(private _httpService: HttpService){
  }

  ngOnInit() {
  	this.owned = this._httpService.totalOwned;
  	this.currentValue = this._httpService.value;
  	this.coinBuy = {bought: 0};
  }

  onBuy(event){
  	event.preventDefault();
  	// console.log("information from buy form", this.coinBuy);
  	let observable = this._httpService.buyCoins(this.coinBuy.bought);
  	// console.log("received back from service with bought amount", observable);
  	this.owned = this._httpService.totalOwned;
  	this.currentValue = this._httpService.value;
    this.coinBuy.bought = 0;
  }

}

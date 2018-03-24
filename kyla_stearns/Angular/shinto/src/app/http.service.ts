import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class HttpService {
  totalOwned: any = 0;
  value: number = 100;
  id: any;
  transaction = {};
  ledger = [];
  QA: any;

  constructor(private _http: Http) {
  	this.transaction = {action: '', amount: 0, id: 0, value: 0};
  }
  
  getID(){
  	return Math.floor((Math.random()* 999)+1);
  }

  retrieveTransaction(id){
  	//  FIND THE TRANSACTION WITH THE ID EQUAL TO THE PARAM PASSED
    console.log("inside retrieveTransaction with id", id);
  	return this.findTransaction(id);
  }

  findTransaction(id){
    console.log("inside findTransaction function", id);
    for(let i = 0; i < this.ledger.length; i++){
      if(this.ledger[i].id === id){
        return this.ledger[i];
      }
      else{
        continue;
      }
    }
  }

  retrieveLedger(){
  	return this.ledger;
  }

  retrieveQuestion(){
  	this.QA = [
  		{question: 'Guess What?', answer: 'chicken butt'},
  		{question: 'What is a group of unicorns known as?', answer: 'a blessing'},
  		{question: 'Where was the fortune cookie actually invented?', answer: 'america'},
  		{question: 'Which animal is known to kill more people than plane crashes?', answer: 'donkeys'},
  		{question: 'Which Hollywood movie showed the first toilet flush?', answer: 'psycho'},
  	];
  	return this.QA;
  }

  buyCoins(coins){
  	// console.log("inside buyCoins in service", coins);
  	this.id = this.getID();
  	// console.log("id for buyCoins", this.id);
  	this.value++;
  	this.transaction = {action: 'Bought', amount: coins, id: this.id, value: this.value}
  	// console.log("this transaction info", this.transaction);
  	this.ledger.push(this.transaction);
  	// console.log("new ledger in buy", this.ledger);
  	// console.log(Number(coins), "number version of coins");
  	this.totalOwned += Number(coins);
  	// console.log("new totalOwned in bought service", this.totalOwned)
  }

  sellCoins(coins){
  	// console.log("inside sellCoins in service", coins);
  	this.id = this.getID();
  	// console.log("id for sellCoins", this.id);
  	this.value--;
  	this.transaction = {action: 'Sold', amount: coins, id: this.id, value: this.value}
  	// console.log("this transaction info", this.transaction);
  	this.ledger.push(this.transaction);
  	// console.log("new ledger in sell", this.ledger);
  	// console.log(Number(coins), "number version of coins");
  	this.totalOwned -= Number(coins);
  	// console.log("new totalOwned in sold service", this.totalOwned)
  }

  mineCoins(coins){
  	// console.log("inside mineCoins in service", coins);
  	this.id = this.getID();
  	// console.log("id for mineCoins", this.id);
  	this.value++;
  	this.transaction = {action: 'Mined', amount: coins, id: this.id, value: this.value}
  	// console.log("this transaction info", this.transaction);
  	this.ledger.push(this.transaction);
  	// console.log("new ledger in mine", this.ledger);
  	// console.log(Number(coins), "number version of coins");
  	this.totalOwned += Number(coins);
  	// console.log("new totalOwned in mine service", this.totalOwned)
  }

}
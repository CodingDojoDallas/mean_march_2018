import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-mine',
  templateUrl: './mine.component.html',
  styleUrls: ['./mine.component.css']
})
export class MineComponent implements OnInit {
  attempt: string = '';
  QA: any; 
  element: number;
  coinMine: any;
  // could totally just make coinMine a number
  owned: any = 0;
  currentValue: number = 0;

  constructor(private _httpService: HttpService){
  }

  ngOnInit() {
  	this.getQuestion();
  	this.element = 0;
  	this.coinMine = {mined: 1};
    // if coinMine is a number, could just set it = 1 here 
  }

  getQuestion(){
  	this.QA = this._httpService.retrieveQuestion();
  }

  getAnswer(event){
  	event.preventDefault();
  	this.attempt = this.attempt.toLowerCase();
  	if(this.QA[this.element].answer === this.attempt){
      this.attempt = '';
  		this.owned = this._httpService.mineCoins(this.coinMine.mined);
      // if coinMine is a number, then just pass this.coinMine here
  		if(this.element <= 4){
  			this.element++;
  		}
  		else{
  			this.element = 0;
  		}
  	}
  	else{
  		if(this.element <= 4){
  			this.element++;
  		}
  		else{
  			this.element = 0;
  		}
  	}
  	
  }

}

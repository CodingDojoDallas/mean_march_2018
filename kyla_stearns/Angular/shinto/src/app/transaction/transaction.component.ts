import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  transaction: any;
  id: number;
  constructor(
  	// inject with HttpService, route and router in order to be able to pull from URL parameter
  	private _httpService: HttpService, 
  	private _route: ActivatedRoute, 
  	private _router: Router) {}

  ngOnInit() {
  	this._route.params.subscribe((params: Params) => {
  		console.log(Number(params['id']));
  		this.id = Number(params['id']);
  		this.transaction = this._httpService.retrieveTransaction(this.id);
  		console.log("Data from this transaction", this.transaction);
  	});
  }

  // TRYING TO GO TO LEDGER/TRANSACTION/ID INSTEAD OF TRANSACTION/ID
  // Error: Uncaught (in promise): 
  // Error: Cannot match any routes. URL Segment: 'ledger/transaction/144'

}

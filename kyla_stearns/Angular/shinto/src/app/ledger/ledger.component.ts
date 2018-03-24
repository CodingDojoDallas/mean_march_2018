import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.css']
})
export class LedgerComponent implements OnInit {
  ledger: any;
  constructor(private _httpService: HttpService){
  }

  ngOnInit() {
  	this.ledger = this._httpService.retrieveLedger();
  }

}

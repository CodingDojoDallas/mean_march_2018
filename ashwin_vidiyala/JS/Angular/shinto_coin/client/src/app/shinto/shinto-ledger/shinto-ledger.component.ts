import { Component, OnInit } from '@angular/core';
import { ShintoService }     from '../../shinto.service';

@Component({
  selector: 'app-shinto-ledger',
  templateUrl: './shinto-ledger.component.html',
  styleUrls: ['./shinto-ledger.component.css']
})
export class ShintoLedgerComponent implements OnInit {
  ledger;

  constructor(private _shintoService: ShintoService) { }

  ngOnInit() {
    this.ledger = this._shintoService.ledger;
  }


}

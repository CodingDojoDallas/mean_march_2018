import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';

import { ShintoService }     from '../../shinto.service';

@Component({
  selector: 'app-shinto-show',
  templateUrl: './shinto-show.component.html',
  styleUrls: ['./shinto-show.component.css']
})
export class ShintoShowComponent implements OnInit {
  ledger;
  transaction: string;
  details: string;

  constructor(
    private _shintoService: ShintoService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.ledger = this._shintoService.ledger;
    let observable =this._route.params;
    observable.subscribe( (params) => {
      // console.log(params['id']);
      this.findTransaction(params['id']);
    })
  }

  findTransaction(id) {
    for (let i = 0; i < this.ledger.length; i++) {
      if ( this.ledger[i].id == id ) {
        this.transaction = id;
        this.details = this.ledger[i].action;
      }
    }
  }


}

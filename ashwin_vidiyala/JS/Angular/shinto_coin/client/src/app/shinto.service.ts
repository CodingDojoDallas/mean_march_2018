import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';

@Injectable()
export class ShintoService {
  value = 0;
  owned = 0;
  ledger = [];

  constructor(private _http: Http) { }

  mineShinto() {
    this.value++;
    this.updateLedger('Mined', 1, this.value);
  }

  updateLedger(action, amount, value) {
    const ledger_entry = {
      id: Math.floor((Math.random() * 9999) + 1),
      action: action,
      amount: amount,
      value: value
    }

    this.ledger.push(ledger_entry);
  }

  buyShinto(value, owned) {
    this.value = value;
    this.owned = owned;
    this.updateLedger('Bought', 1, this.value);
  }

  sellShinto(value, owned) {
    this.value = value;
    this.owned = owned;
    this.updateLedger('Sold', 1, this.value);
  }

}

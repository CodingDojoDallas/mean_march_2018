import { Component, OnInit } from '@angular/core';
import { ShintoService }     from '../../shinto.service';

@Component({
  selector: 'app-shinto-sell',
  templateUrl: './shinto-sell.component.html',
  styleUrls: ['./shinto-sell.component.css']
})
export class ShintoSellComponent implements OnInit {
  value: number;
  owned: number;

  constructor(private _shintoService: ShintoService) { }

  ngOnInit() {
    this.value = this._shintoService.value;
    this.owned = this._shintoService.owned;
  }

  sellShinto() {
    if (this.owned > 0) {
      this.owned--;
      this.value--;

      this._shintoService.sellShinto(this.value, this.owned);
    }
  }
}

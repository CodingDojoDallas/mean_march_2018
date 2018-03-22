import { Component, OnInit } from '@angular/core';
import { ShintoService }     from '../../shinto.service';

@Component({
  selector: 'app-shinto-buy',
  templateUrl: './shinto-buy.component.html',
  styleUrls: ['./shinto-buy.component.css']
})
export class ShintoBuyComponent implements OnInit {
  value: number;
  owned: number;

  constructor(private _shintoService: ShintoService) { }

  ngOnInit() {
    this.value = this._shintoService.value;
    this.owned = this._shintoService.owned;
  }

  buyShinto() {
    this.value += 1;
    this.owned += 1;

    this._shintoService.buyShinto(this.value, this.owned);
  }


}

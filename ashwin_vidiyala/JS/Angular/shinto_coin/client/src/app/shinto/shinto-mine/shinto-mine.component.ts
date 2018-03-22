import { Component, OnInit } from '@angular/core';
import { ShintoService }     from '../../shinto.service';

@Component({
  selector: 'app-shinto-mine',
  templateUrl: './shinto-mine.component.html',
  styleUrls: ['./shinto-mine.component.css']
})
export class ShintoMineComponent implements OnInit {
  answer = {num: 0};

  constructor(private _shintoService: ShintoService) { }

  ngOnInit() {
  }

  mineShinto(event) {
    event.preventDefault();
    if (this.answer.num == 13) {
      this._shintoService.mineShinto();
    }
  }
}

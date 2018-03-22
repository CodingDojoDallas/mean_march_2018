import { Component, OnInit } from '@angular/core';
import { ShintoService }     from '../shinto.service';

@Component({
  selector: 'app-shinto',
  templateUrl: './shinto.component.html',
  styleUrls: ['./shinto.component.css']
})
export class ShintoComponent implements OnInit {

  constructor(private _shintoService: ShintoService) { }

  ngOnInit() {
  }
}

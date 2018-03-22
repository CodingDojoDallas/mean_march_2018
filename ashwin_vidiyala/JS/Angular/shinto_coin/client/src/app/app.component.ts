import { Component, OnInit }  from '@angular/core';
import { ShintoService }       from './shinto.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private _shintoService: ShintoService) {}

  ngOnInit() {

  }
}

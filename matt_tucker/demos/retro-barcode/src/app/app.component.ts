import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title:string;
  colors:object[];
  inter;

  constructor() {
      this.title = 'Retro Barcode';
  }

  ngOnInit() {
    this.startInter();
  }

  hovering(e, index) {
    this.colors[index] = 'black'
  }

  randomColors(): void {
      this.colors = [];

      for (var i = 0; i < 50; i++) {
          let random = {random: '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6)}

          this.colors.push(random);
      }
  }

  startInter(): void {
    this.inter = setInterval(
      () => {
        this.randomColors() 
      }, 
      500
    );
  }

  clearInter(): void {
    clearInterval(this.inter);
  }

  outputColor(color) {
    console.log(color);
  }
}




import { Component, OnInit }    from '@angular/core';
import { NinjaService }         from './ninja.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user;
  user_id;
  gold;
  adventure_log = [];

  constructor (private _ninjaService: NinjaService) {}

  ngOnInit() {
    this.createUserFromService();
  }

  createUserFromService() {
    let observable = this._ninjaService.createUser();
    observable.subscribe( (data) => {
      this.user = data.json();
      this.user_id = this.user.data._id;
      this.gold = this.user.data.gold;
    })
  }

  farm() {
    let gold_produced = Math.floor(Math.random() * 4) + 2;
    this.setGold(gold_produced);
    let log_message = `You earned ${gold_produced} at the farm.`;
    this.adventure_log.push(log_message);
    this.updateUserInfo(this.user_id, gold_produced, log_message);
  }

  cave() {
    let gold_produced = Math.floor(Math.random() * 6) + 5;
    this.setGold(gold_produced);
    let log_message = `You earned ${gold_produced} at the cave.`;
    this.adventure_log.push(log_message);
    this.updateUserInfo(this.user_id, gold_produced, log_message);
  }

  house() {
    let gold_produced = Math.floor(Math.random() * 9) + 7;
    this.setGold(gold_produced);
    let log_message = `You earned ${gold_produced} at the house.`;
    this.adventure_log.push(log_message);
    this.updateUserInfo(this.user_id, gold_produced, log_message);
  }

  casino() {
    let gold_produced = Math.floor(Math.random() * 201) - 100;
    this.setGold(gold_produced);
    let log_message = '';
    if (gold_produced >= 0 ) {
      log_message = `You earned ${gold_produced} at the casino.`;
    } else {
      log_message = `You lost ${gold_produced * -1} at the casino.`;
    }
    this.adventure_log.push(log_message);
    this.updateUserInfo(this.user_id, gold_produced, log_message);
  }

  setGold(gold) {
    this.gold += gold;
  }

  updateUserInfo(user_id, gold, log) {
    let observable = this._ninjaService.updateUserInfo(user_id, gold, log);
    observable.subscribe();
  }

  // getUserInfoFromService(user_id) {
  //   let observable = this._ninjaService.getUserInfo(user_id);
  //   observable.subscribe( (data) => {
  //   return data.json();
  //   })
  // }
  //
  // getGold(user_id) {
  //   return this.getUserInfoFromService(user_id).data.gold;
  // }
}

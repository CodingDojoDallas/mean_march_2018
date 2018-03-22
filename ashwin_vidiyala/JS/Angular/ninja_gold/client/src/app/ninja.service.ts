import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';

@Injectable()
export class NinjaService {

  constructor(private _http: Http) {}

  createUser() {
    return this._http.get('/users/new');
  }

  // getUserInfo(user_id) {
  //   return this._http.get(`/users/${user_id}`);
  // }

  updateUserInfo(user_id, gold, log) {
    let data = {
      'gold': gold,
      'log': log
    }

    return this._http.put(`/users/${user_id}`, data);
  }
}

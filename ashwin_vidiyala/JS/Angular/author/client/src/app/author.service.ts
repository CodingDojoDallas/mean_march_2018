import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';

@Injectable()
export class AuthorService {

  constructor(private _http: Http) { }

  getAuthors() {
    return this._http.get('/authors');
  }

  getQuotes(id) {
    return this._http.get(`/authors/${id}`);
  }

  addAuthor(author) {
    return this._http.post('/authors', author);
  }

  addQuote(id, quote) {
    return this._http.post(`/authors/${id}`, quote);
  }

  voteUpQuote(id) {
    return this._http.put(`/quote/up/${id}`);
  }

  voteDownQuote(id) {
    return this._http.put(`/quote/down/${id}`);
  }

  getAuthor(id) {
    return this._http.get(`/authors/${id}`);
  }

  editAuthor(id, author) {
    return this._http.put(`/authors/${id}`, author);
  }

  deleteAuthor(id) {
    return this._http.delete(`/authors/${id}`);
  }

  deleteQuote(id) {
    return this._http.delete(`/quotes/${id}`);
  }
}

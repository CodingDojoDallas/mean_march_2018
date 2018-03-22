import { Component, OnInit }         from '@angular/core';
import { AuthorService }             from '../../author.service';
import { ActivatedRoute, Router }    from '@angular/router';

@Component({
  selector: 'app-quote-show',
  templateUrl: './quote-show.component.html',
  styleUrls: ['./quote-show.component.css']
})
export class QuoteShowComponent implements OnInit {
  author_id;
  quotes;
  author_name;

  constructor(
    private _authorService: AuthorService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getQuotes();
    // this.getAuthorName();
    this.quotes = [];
  }

  getQuotes() {
    this._route.params.subscribe( (params) => {
      this.author_id = params['id'];
      let observable = this._authorService.getQuotes(this.author_id);
      observable.subscribe( (res) => {
        this.quotes = res.json().data.quotes;
        this.author_name = res.json().data.name;
      })
    })
  }

  voteUpQuote(id) {
    let observable = this._authorService.voteUpQuote(id);
    observable.subscribe( (res) => {
      this.getQuotes();
    })
  }

  voteDownQuote(id) {
    let observable = this._authorService.voteDownQuote(id);
    observable.subscribe( (res) => {
      this.getQuotes();
    })
  }

  deleteQuote(id) {
    let observable = this._authorService.deleteQuote(id);
    observable.subscribe( (res) => {
      this.getQuotes();
    })
  }
}

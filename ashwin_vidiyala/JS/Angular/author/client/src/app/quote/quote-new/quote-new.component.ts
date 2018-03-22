import { Component, OnInit }      from '@angular/core';
import { AuthorService }          from '../../author.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quote-new',
  templateUrl: './quote-new.component.html',
  styleUrls: ['./quote-new.component.css']
})
export class QuoteNewComponent implements OnInit {
  quote;
  author_id;
  error;
  author_name;

  constructor(
    private _authorService: AuthorService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.getAuthorId();
    this.quote = {
      content: '',
      vote: 0
    }
    this.error = '';
  }

  getAuthorName() {
    let observable = this._authorService.getAuthor(this.author_id);
    observable.subscribe( (res) => {
      this.author_name = res.json().data.name;
    })
  }

  getAuthorId() {
    this._route.params.subscribe((params) => {
      this.author_id = params['id'];
      this.getAuthorName();
    })
  }

  addQuote(event) {
    let observable = this._authorService.addQuote(this.author_id, this.quote);
    observable.subscribe(
      (res) => {
        this._router.navigate(['/quote', this.author_id])
      },
      (err) => {
        this.error = err.json().error.message;
        console.log(this.error);
      }
    )
  }
}

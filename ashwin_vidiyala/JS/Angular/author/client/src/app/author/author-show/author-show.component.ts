import { Component, OnInit } from '@angular/core';
import { AuthorService }     from '../../author.service';
import { Router }            from '@angular/router';

@Component({
  selector: 'app-author-show',
  templateUrl: './author-show.component.html',
  styleUrls: ['./author-show.component.css']
})
export class AuthorShowComponent implements OnInit {
  authors;

  constructor(
    private _authorService: AuthorService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.getAuthors();
  }

  getAuthors() {
    let observable = this._authorService.getAuthors();

    observable.subscribe( (data) => {
      this.authors = data.json().data;
    })
  }

  deleteAuthor(id) {
    let observable = this._authorService.deleteAuthor(id);
    observable.subscribe( (res) => {
        this.getAuthors();
    });
  }
}

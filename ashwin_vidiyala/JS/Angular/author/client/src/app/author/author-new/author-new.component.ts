import { Component, OnInit } from '@angular/core';
import { AuthorService }     from '../../author.service';
import { Router }            from '@angular/router';

@Component({
  selector: 'app-author-new',
  templateUrl: './author-new.component.html',
  styleUrls: ['./author-new.component.css']
})
export class AuthorNewComponent implements OnInit {
  author = {
    name: ''
  };
  error: String;

  constructor(
    private _authorService: AuthorService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.error = '';
  }

  addAuthor(event) {
    event.preventDefault();
    let observable = this._authorService.addAuthor(this.author);
    observable.subscribe(
      (res) => {
        this._router.navigate(['/show']);
      },
      (err) => {
        this.error = err.json().error.message;
      }
    );
  }
}

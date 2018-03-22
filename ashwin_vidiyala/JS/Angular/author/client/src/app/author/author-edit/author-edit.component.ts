import { Component, OnInit } from '@angular/core';
import { AuthorService }     from '../../author.service';
import { ActivatedRoute, Router }    from '@angular/router';

@Component({
  selector: 'app-author-edit',
  templateUrl: './author-edit.component.html',
  styleUrls: ['./author-edit.component.css']
})
export class AuthorEditComponent implements OnInit {
  author = {
    id: '',
    name: ''
  };
  error: String;

  constructor(
    private _authorService: AuthorService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.getAuthor();
    this.error = '';
  }

  getAuthor() {
    this._route.params.subscribe((params) => {
      let observable = this._authorService.getAuthor(params['id']);
      observable.subscribe( (res) => {
        this.author.name = res.json().data.name;
        this.author.id = res.json().data._id;
      })
    })
  }

  editAuthor(event) {
    event.preventDefault();
    let observable = this._authorService.editAuthor(this.author.id, this.author);
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

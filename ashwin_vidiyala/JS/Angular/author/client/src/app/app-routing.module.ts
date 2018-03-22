import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthorShowComponent }  from './author/author-show/author-show.component';
import { AuthorNewComponent }   from './author/author-new/author-new.component';
import { AuthorEditComponent }  from './author/author-edit/author-edit.component';
import { QuoteShowComponent }   from './quote/quote-show/quote-show.component';
import { QuoteNewComponent }    from './quote/quote-new/quote-new.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/show' },
  { path: 'show',          component: AuthorShowComponent },
  { path: 'new',           component: AuthorNewComponent },
  { path: 'edit/:id',      component: AuthorEditComponent },
  { path: 'quote/:id',     component: QuoteShowComponent },
  { path: 'quote/new/:id', component: QuoteNewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

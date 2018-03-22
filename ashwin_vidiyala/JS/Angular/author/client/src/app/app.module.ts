import { BrowserModule } from '@angular/platform-browser';
import { NgModule }      from '@angular/core';
import { HttpModule }    from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { AuthorService } from './author.service';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AuthorComponent } from './author/author.component';
import { AuthorShowComponent } from './author/author-show/author-show.component';
import { AuthorNewComponent } from './author/author-new/author-new.component';
import { AuthorEditComponent } from './author/author-edit/author-edit.component';
import { QuoteComponent } from './quote/quote.component';
import { QuoteShowComponent } from './quote/quote-show/quote-show.component';
import { QuoteNewComponent } from './quote/quote-new/quote-new.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthorComponent,
    AuthorShowComponent,
    AuthorNewComponent,
    AuthorEditComponent,
    QuoteComponent,
    QuoteShowComponent,
    QuoteNewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule
  ],
  providers: [AuthorService],
  bootstrap: [AppComponent]
})
export class AppModule { }

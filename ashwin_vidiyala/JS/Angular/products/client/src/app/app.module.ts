import { BrowserModule } from '@angular/platform-browser';
import { NgModule }      from '@angular/core';
import { HttpModule }    from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { ProductService }from './product.service';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { ProductHomeComponent } from './product/product-home/product-home.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductNewComponent } from './product/product-new/product-new.component';
import { ProductEditComponent } from './product/product-edit/product-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductHomeComponent,
    ProductListComponent,
    ProductNewComponent,
    ProductEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductHomeComponent } from './product/product-home/product-home.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductNewComponent } from './product/product-new/product-new.component';
import { ProductEditComponent } from './product/product-edit/product-edit.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home'},
  { path: 'home',      component: ProductHomeComponent },
  { path: 'list',      component: ProductListComponent },
  { path: 'new',       component: ProductNewComponent },
  { path: 'edit/:id',  component: ProductEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

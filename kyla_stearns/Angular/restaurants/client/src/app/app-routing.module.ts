import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { NewRestaurantComponent } from './new-restaurant/new-restaurant.component';
import { EditRestaurantComponent } from './edit-restaurant/edit-restaurant.component';
import { ReviewComponent } from './review/review.component';
import { NewReviewComponent } from './new-review/new-review.component';

const routes: Routes = [
	{path: '', pathMatch: 'full', component: HomeComponent },
	{path: 'home', component: HomeComponent },
	{path: 'new', component: NewRestaurantComponent},
	{path: 'edit/:id', component: EditRestaurantComponent},
	{path: 'reviews/:id', component: ReviewComponent},
	{path: 'write/:id', component: NewReviewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Component, OnInit, Input, Inject } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import {Location } from '@angular/common';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';
import { Observable, of} from 'rxjs';



@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.css']
})
export class DishdetailComponent implements OnInit {
  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;

  constructor(
      private dishService: DishService,
      private location: Location,
      private route: ActivatedRoute,
      @Inject('BaseImageURL') private baseImageURL
    ) { }

  ngOnInit() {
    console.dir(this.route.params);
    this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    let id = this.route.params.pipe( switchMap( (params: Params)  =>  this.dishService.getDish(params['id'])))
      .subscribe( (dish) => {this.dish = dish; this.setPrevNext(dish.id);} );

  }
  goBack(): void {
    this.location.back();
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

}
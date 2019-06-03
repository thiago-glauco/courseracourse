import { Component, OnInit, Input, Inject } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Params, ActivatedRoute } from '@angular/router';
import {Location } from '@angular/common';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';
import { Observable, of} from 'rxjs';



@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.css'],
  animations: [
    trigger('visibility', [
        state('shown', style({
            transform: 'scale(1.0)',
            opacity: 1
        })),
        state('hidden', style({
            transform: 'scale(0.5)',
            opacity: 0
        })),
        transition('* => *', animate('0.5s ease-in-out'))
    ])
  ]
})
export class DishdetailComponent implements OnInit {
  dish: Dish;
  dishIds: string[];
  dishcopy: Dish;
  prev: string;
  next: string;
  errMsg: string
  visibility = 'shown';

  constructor(
      private dishService: DishService,
      private location: Location,
      private route: ActivatedRoute,
      @Inject('BaseImageURL') private baseImageURL
    ) { }

  ngOnInit() {
    console.dir(this.route.params);
    this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    let id = this.route.params.pipe( switchMap( (params: Params)  =>  {
      this.visibility = 'hidden';
      return this.dishService.getDish(+params['id'])
      }))
      .subscribe( 
        (dish) => {
          this.dish = dish;
          this.dishcopy = dish;
          this.setPrevNext(dish.id);
          this.visibility = 'shown';
        },
        errmess => this.errMsg = <any>errmess
      );

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
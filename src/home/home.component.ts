import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { Observable, of} from 'rxjs';
import {map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leader: Leader;
  errMsg: string;

  constructor(
    private promotionService: PromotionService,
    private dishService: DishService,
    private leaderService: LeaderService,
    @Inject('BaseImageURL') private baseImageURL) { }

  ngOnInit() {
    this.dishService.getFeaturedDish()
      .subscribe( (dish) => {
         this.dish = dish;
      })
     
    this.promotionService.getFeaturedPromotion()
    .subscribe((promotion)=>{
      console.dir(promotion);
      console.dir(promotion[Object.getOwnPropertyNames(promotion)[0]]);
       this.promotion = promotion[Object.getOwnPropertyNames(promotion)[0]];
    });

    this.leaderService.getFeaturedLeader()
      .subscribe( (leader)=>{
        console.dir( Object.getOwnPropertyNames(leader) );
        this.leader = leader[Object.getOwnPropertyNames(leader)[0]];
      });
  }

}
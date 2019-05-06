import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leader: Leader;

  constructor(
    private promotionService: PromotionService,
    private dishService: DishService,
    private leaderService: LeaderService) { }

  ngOnInit() {
    this.dishService.getFeaturedDish()
      .then( (dish) => {
         this.dish = dish;
      })
      .catch( (error) => {

      });
    this.promotionService.getFeaturedPromotion()
    .subscribe((promotion)=>{
      this.promotion = promotion;
    });
    this.leaderService.getFeaturedLeader()
      .subscribe( (leader)=>{
        this.leader = leader;
      });
  }

}
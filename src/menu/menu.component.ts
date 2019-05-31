import { Component, OnInit, Inject } from '@angular/core';
import { databaseURL, baseImageURL} from '../shared/baseurl';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  
  dishes: Dish[];
  selectedDish: Dish;

  onSelect( dish: Dish){
    this.selectedDish = dish;
  }

  constructor(private dishService: DishService,
    @Inject('BaseImageURL') private baseImageURL ) {
  }

  ngOnInit() {
    this.dishService.getDishes()
      .subscribe( (dishes)=>{
        this.dishes = dishes;
        console.dir(this.dishes);
      });
  }


}
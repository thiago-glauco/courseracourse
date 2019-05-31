import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { databaseURL, baseImageURL} from '../shared/baseurl';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class DishService {

  constructor(private http: HttpClient ) { }

  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(databaseURL + 'dishes.json');
  }

  getDish(id: string): Observable<Dish> {
    return of(DISHES.filter((dish) => (dish.id === id))[0]) 
            .pipe(delay(2000));

  }

  getFeaturedDish(): Observable<Dish> {
    return of(DISHES.filter((dish) => dish.featured)[0])
      .pipe( delay(1000));
  }

  getDishIds(): Observable<string[] | any> {
    return of( DISHES.map( (dish) => (dish.id)));
  }
  

}
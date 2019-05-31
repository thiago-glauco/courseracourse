import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { databaseURL, baseImageURL} from '../shared/baseurl';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { Observable, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';

@Injectable()
export class DishService {

  constructor(private http: HttpClient ) { }

  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(databaseURL + 'dishes.json');
  }

  getDish(id: string): Observable<Dish> {
    return this.http.get<Dish>(databaseURL + 'dishes/' + id + '.json');
  }

  getFeaturedDish(): Observable<Dish> {
   return this.http.get<Dish[]>(databaseURL + 'dishes.json?orderBy="featured"&equalTo=true').pipe(
      map ( dishes => dishes[0])
    )
  }

  getDishIds(): Observable<string[] | any> {
    return of( DISHES.map( (dish) => (dish.id)));
  }
  

}
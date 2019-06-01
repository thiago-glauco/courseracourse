import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProcessHttpMessagesService } from './process-http-messages.service';
import { databaseURL, baseImageURL} from '../shared/baseurl';
import { Dish } from '../shared/dish';
//import { DISHES } from '../shared/dishes';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class DishService {

  constructor(private http: HttpClient,
  private processHttpMessages: ProcessHttpMessagesService) { }

  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(databaseURL + 'dishes.json')
      .pipe(
        catchError( 
          this.processHttpMessages.handleError)
      );
  }

  getDish(id: string): Observable<Dish> {
    return this.http.get<Dish>(databaseURL + 'dishes/' + id + '.json')
    .pipe(
        catchError(this.processHttpMessages.handleError)
      );
  }

  getFeaturedDish(): Observable<Dish> {
   return this.http.get<Dish[]>(databaseURL + 'dishes.json?orderBy="featured"&equalTo=true').pipe(
      map ( dishes => dishes[0]),
      catchError(this.processHttpMessages.handleError)
    )
  }

  getDishIds(): Observable<string[] | any> {
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)))
    .pipe(
      catchError(error => error)
    );
  }
  

}
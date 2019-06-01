import { Injectable } from '@angular/core';
import { databaseURL, baseImageURL} from '../shared/baseurl';
import { PROMOTIONS } from '../shared/promotions';
import { Promotion } from '../shared/promotion';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';

@Injectable()
export class PromotionService {

  constructor(private http: HttpClient) { }

  getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(databaseURL + 'promotions.json');

  }

  getPromotion(id: string): Observable<Promotion> {
    return this.http.get<Promotion>(databaseURL + 'promotions/' + id + '.json')
      .pipe( map (promotion => {
          return promotion[0]
      }))
    //return of( PROMOTIONS.filter((promo) => (promo.id === id))[0]).pipe(delay(2000));
  }
  
  getFeaturedPromotion(): Observable<any> {
    return this.http.get<Promotion[]>(databaseURL + 'promotions.json?orderBy="featured"&equalTo=true');
  }
}
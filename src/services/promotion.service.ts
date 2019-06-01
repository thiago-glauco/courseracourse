import { Injectable } from '@angular/core';
import { databaseURL, baseImageURL} from '../shared/baseurl';
import { PROMOTIONS } from '../shared/promotions';
import { Promotion } from '../shared/promotion';
import { ProcessHttpMessagesService } from './process-http-messages.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class PromotionService {

  constructor(
    private http: HttpClient,
    private processHttpMessages: ProcessHttpMessagesService) { }

  getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(databaseURL + 'promotions.json').pipe(
        catchError( 
          this.processHttpMessages.handleError
        )
      );

  }

  getPromotion(id: string): Observable<Promotion> {
    return this.http.get<Promotion>(databaseURL + 'promotions/' + id + '.json')
      .pipe(
        map (promotion => {
          return promotion[0]
      }),
        catchError( 
          this.processHttpMessages.handleError
        )
      )
    //return of( PROMOTIONS.filter((promo) => (promo.id === id))[0]).pipe(delay(2000));
  }
  
  getFeaturedPromotion(): Observable<any> {
    return this.http.get<Promotion[]>(databaseURL + 'promotions.json?orderBy="featured"&equalTo=true')
    .pipe(
      catchError(error => error)
    );
  }
}
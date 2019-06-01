import { Injectable } from '@angular/core';
import { databaseURL, baseImageURL} from '../shared/baseurl';
import { HttpClient } from '@angular/common/http';
import { ProcessHttpMessagesService } from './process-http-messages.service';
import { Leader } from '../shared/leader';
//import { LEADERS } from '../shared/leaders';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class LeaderService {
  
  constructor(private http: HttpClient,
    private processHttpMessages: ProcessHttpMessagesService) { }

  getLeaders(): Observable<Leader[]> {
    return this.http.get<Leader[]>(databaseURL + 'leadership.json').pipe(
        catchError( 
          this.processHttpMessages.handleError
        )
      );
    /*return of(LEADERS)
      .pipe( delay(2000));*/
  }
  getLeader(id: string): Observable<Leader> {
    return this.http.get<Leader>(databaseURL + 'leadership/' + id + '.json')
      .pipe( map (leader => {
          return leader[0]
          }),
          catchError( 
          this.processHttpMessages.handleError)
          )
  }
  getFeaturedLeader(): Observable<any>{
    return this.http.get<Leader[]>(databaseURL + 'leadership.json?orderBy="featured"&equalTo=true')
    .pipe(
      catchError(error => error)
    );
     
    /*return of(LEADERS.filter((leader) => leader.featured)[0])
    .pipe( delay(2000));*/
  }

}
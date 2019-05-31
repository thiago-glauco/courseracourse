import { Injectable } from '@angular/core';
import { databaseURL, baseImageURL} from '../shared/baseurl';
import { HttpClient } from '@angular/common/http';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { Observable, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';

@Injectable()
export class LeaderService {
  
  constructor(private http: HttpClient) { }

  getLeaders(): Observable<Leader[]> {
    return this.http.get<Leader[]>(databaseURL + 'leadership.json');
    /*return of(LEADERS)
      .pipe( delay(2000));*/
  }
  getLeader(id: string): Observable<Leader> {
    return this.http.get<Leader>(databaseURL + 'leadership/' + id + '.json');
    /*return of(LEADERS.filter( (leader) => leader.id === id )[0])
    .pipe(delay(2000));*/
  }
  getFeaturedLeader():  Observable<Leader> {
    return this.http.get<Leader[]>(databaseURL + 'leadership.json??orderBy="featured"&equalTo=true').pipe(
      map ( (leader) => {console.log(leader[0]);return leader[0]})
    )
    /*return of(LEADERS.filter((leader) => leader.featured)[0])
    .pipe( delay(2000));*/
  }

}
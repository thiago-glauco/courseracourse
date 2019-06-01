import { Injectable } from '@angular/core';
import { databaseURL, baseImageURL} from '../shared/baseurl';
import { HttpClient } from '@angular/common/http';
import { Leader } from '../shared/leader';
//import { LEADERS } from '../shared/leaders';
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
    return this.http.get<Leader>(databaseURL + 'leadership/' + id + '.json')
      .pipe( map (leader => {
          return leader[0]
          }))
  }
  getFeaturedLeader(){
    return this.http.get<Leader[]>(databaseURL + 'leadership.json?orderBy="featured"&equalTo=true');
     
    /*return of(LEADERS.filter((leader) => leader.featured)[0])
    .pipe( delay(2000));*/
  }

}
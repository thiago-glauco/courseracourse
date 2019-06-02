import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProcessHttpMessagesService } from './process-http-messages.service';
import { databaseURL, baseImageURL} from '../shared/baseurl';
import { Feedback } from '../shared/feedback';
//import { DISHES } from '../shared/dishes';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class FeedbackService {

  constructor(private http: HttpClient,
  private processHttpMessages: ProcessHttpMessagesService) { }

    putFeedback( feedback: Feedback) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    console.dir(feedback);

    return this.http.post(databaseURL + 'dishes.json', feedback, httpOptions)
    .subscribe(
      result => {console.dir(result)},
      error => {console.dir(error)}
    )
    /*.pipe(
       catchError(this.processHttpMessages.handleError)
    );*/
  }

}
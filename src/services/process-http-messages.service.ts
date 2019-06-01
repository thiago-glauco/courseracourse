import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http'

@Injectable()
export class ProcessHttpMessagesService {

  constructor() { }

  public handleError(error: HttpErrorResponse | any ) {
    let errMsg: string;
    if (error.error instanceof ErrorEvent) {
      errMsg = error.error.message;
    }
    else {
      errMsg = `${error.status} - ${error.error.statusText || ''} ${error.error.message}`
    }

    return throwError(errMsg);
  }

}
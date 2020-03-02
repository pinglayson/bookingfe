import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Booking } from './booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  baseUrl = 'http://localhost:8888/api';
  bookings: Booking[];

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + btoa('admin:admin')
    })
  };

  getAll(): Observable<Booking[]> {
    return this.http.get(`${this.baseUrl}/list`,this.httpOptions).pipe(
      map((res) => {
        this.bookings = res['data'];
        return this.bookings;
    }),
    catchError(this.handleError));
  }

  store(booking: Booking): Observable<Booking[]> {
    return this.http.post(`${this.baseUrl}/store`, { data: booking },this.httpOptions)
      .pipe(map((res) => {
        this.bookings.push(res['data']);
        return this.bookings;
      }),
      catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);

    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }
}

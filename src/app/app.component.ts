import { Component, OnInit } from '@angular/core';

import { Booking } from './booking';
import { BookingService } from './booking.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  bookings: Booking[];
  error = '';
  success = '';

  booking = new Booking('','',new Date(),0,'','', 0);

  constructor(private bookingService: BookingService) {
  }

  ngOnInit() {
    this.getCars();
  }

  getCars(): void {
    this.bookingService.getAll().subscribe(
      (res: Booking[]) => {
        this.bookings = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }

  addCar(f) {
    this.resetErrors();

    this.bookingService.store(this.booking)
      .subscribe(
        (res: Booking[]) => {
          // Update the list of bookings
          this.bookings = res;

          // Inform the user
          this.success = 'Created successfully';

          // Reset the form
          f.reset();
        },
        (err) => this.error = err
      );
  }

  private resetErrors(){
    this.success = '';
    this.error   = '';
  }

}

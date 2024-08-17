import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Add import so that trip-listing can recognize trip-card component 
import { TripCardComponent } from '../trip-card/trip-card.component';

// Importing the TripDataService
import { TripDataService } from '../services/trip-data.service';
// Importing the Trip model
import { Trip } from '../models/trip';

// Bring in the routing capability
import { Router } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  // Add import TripCardComponent so that trip-listing can recognize trip-card component 
  imports: [CommonModule, TripCardComponent],
  templateUrl: './trip-listing.component.html',
  styleUrl: './trip-listing.component.css',
  // Registering TripDataService as a provider
  providers: [TripDataService]
})

// implement OnInit for the class variable
export class TripListingComponent implements OnInit{
  trips: Trip[] = [];
  message: string = '';

  // Constructor to initialize the TripDataService
  constructor(
    private tripDataService: TripDataService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    // console.log('trip-listing constructor');
  }

  // Method that will call teh getTrips() method in TripDataService
  private getStuff(): void{
    this.tripDataService.getTrips()
    .subscribe({
      next: (value: any) => {
        this.trips = value;
        if(value.length > 0){
          this.message = 'There are ' + value.length + ' trips available.'
        }
        else{
          this.message = 'There were no trips retrieved from the database';
        }
        console.log(this.message);
      },
      error: (error: any) =>{
        console.log('Error: ' + error);
      }
    })
  }

  /* 
   * addTrip is made public because it is going to need to be accessed externally from the perspective 
   * of the trip-listing component 
  */
  public addTrip(): void{
    this.router.navigate(['add-trip'])
  }

  // ngOnInit methos that will call private method when the component is initialized
  ngOnInit(): void{
    console.log('ngOnInit');
    this.getStuff();
  }

  public isLoggedIn(){
    return this.authenticationService.isLoggedIn();
  }
}

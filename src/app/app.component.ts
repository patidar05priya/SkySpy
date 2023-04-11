import { Component, OnDestroy, OnInit } from '@angular/core';
import {UiService} from './services/ui.service';
import { DatePipe } from '@angular/common';


import {Router} from '@angular/router';
import { Subscription, Observable, of as observableOf  } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DatePipe]
})
export class AppComponent implements OnInit, OnDestroy {
  
  showMenu = false;
  darkModeActive: boolean = false;
  myDate = new Date();


  userEmail = "";
  sub1: Subscription = new Subscription;

  constructor( public ui: UiService, public router: Router, private datePipe: DatePipe) {
    //this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');

  }

  loggedIn = this.method();

  method(): Observable<boolean> {
   return observableOf(true);;

  }

  ngOnInit(): void {
    this.sub1 = this.ui.darkModeState.subscribe((value : any) => {
      this.darkModeActive = value;
    });

   
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  modeToggleSwitch() {
    this.ui.darkModeState.next(!this.darkModeActive);
  }

  ngOnDestroy(): void {
    this.sub1.unsubscribe();
  }

  logout() {
    this.toggleMenu();
    this.router.navigateByUrl('/login');
   // this.fireBase.auth.signout();
  }
}

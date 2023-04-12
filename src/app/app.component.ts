import { Component, OnDestroy, OnInit } from '@angular/core';
import {UiService} from './services/ui.service';
import { DatePipe } from '@angular/common';
import {FireBaseService} from './services/firebase.service';
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
  sub1: Subscription = new Subscription;

  myDate = new Date();

  userEmail = "";
  loggedIn = this.firebase.isAuth();


  constructor( public ui: UiService, public router: Router, private datePipe: DatePipe, private firebase : FireBaseService) {

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
    this.firebase.SignOut();
  }
}

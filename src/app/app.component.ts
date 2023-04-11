import { Component, OnDestroy, OnInit } from '@angular/core';
import {UiService} from './services/ui.service';
import {FireBaseService} from './services/firebase.service';

import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  
  showMenu = false;
  darkModeActive: boolean = false;

  userEmail = "";
  sub1: any;

  constructor(public fireBase: FireBaseService, public ui: UiService, public router: Router) {
  }

  loggedIn = this.fireBase.isAuth();

  ngOnInit(): void {
    this.sub1 = this.ui.darkModeState.subscribe((value : any) => {
      this.darkModeActive = value;
    });

    this.fireBase.auth.userData().subscribe((user) => {
      this.userEmail = user.email;
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
    this.fireBase.auth.signout();
  }
}

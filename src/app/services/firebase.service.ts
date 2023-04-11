import {Injectable, NgZone} from '@angular/core';
import { of as observableOf  } from 'rxjs';
import '@firebase/auth'
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument} from '@angular/fire/compat/firestore';
@Injectable({
    providedIn: 'root'
})
export class FireBaseService {

  constructor(public afs: AngularFirestore, public afAuth: AngularFireAuth, public router: Router, public ngZone: NgZone 
  ) {}
      isAuth() {
        const user = JSON.parse(localStorage.getItem('user')!);
        return observableOf(true);
        //return observableOf(user !== null && user.emailVerified !== false ? true : false);
      }
    
      signin(email: string, pass: string) {
        return this.afAuth
      .signInWithEmailAndPassword(email, pass)
      .then((result) => {
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['dashboard']);
          }
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
      }
    
      signup(email: string, password: string) {
        return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
       
      })
      .catch((error) => {
        window.alert(error.message);
      });
      }
      
      getCities() {
       
      }

      SignOut() {
        return this.afAuth.signOut().then(() => {
          localStorage.removeItem('user');
          this.router.navigate(['sign-in']);
        });
      }
    
      addCity(name: string) {
        
      }

}
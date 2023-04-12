import {Injectable, NgZone} from '@angular/core';
import { of, of as observableOf ,Observable } from 'rxjs';
import '@firebase/auth'
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { AngularFirestore, AngularFirestoreDocument} from '@angular/fire/compat/firestore';
@Injectable({
    providedIn: 'root'
})
export class FireBaseService {
  citiesRef!: AngularFireList<any>;


  constructor(public afs: AngularFirestore, public afAuth: AngularFireAuth, public router: Router, 
    public ngZone: NgZone, private db: AngularFireDatabase
  ) {}
      isAuth() {
        const user = JSON.parse(localStorage.getItem('user')!);
        //return observableOf(true);
        return observableOf(user !== null && user.emailVerified !== false ? true : false);
      }
    
      signin(email: string, pass: string) {
        const auth =  this.afAuth
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
      return of(auth)
      }
    
      signup(email: string, password: string) {
        const auth = this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
       
      })
      .catch((error) => {
        window.alert(error.message);
      });
      return of(auth)
      }
      
      getCities() {
        console.log(this.db.list)
        this.citiesRef = this.db.list('cities');
        return of(this.citiesRef);
      }

      SignOut() {
        return this.afAuth.signOut().then(() => {
          localStorage.removeItem('user');
          this.router.navigate(['sign-in']);
        });
      }
    
      addCity(name: string): Observable<any> {
        return of(this.citiesRef.push({
          name: name
        }));
      }

}
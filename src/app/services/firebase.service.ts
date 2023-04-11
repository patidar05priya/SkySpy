import {Injectable} from '@angular/core';
import {AngularFireLiteAuth, AngularFireLiteFirestore} from 'angularfire-lite';
import {first, switchMap} from 'rxjs/operators';
import '@firebase/auth'

@Injectable({
    providedIn: 'root'
})
export class FireBaseServce {

    constructor(public auth: AngularFireLiteAuth, public fs: AngularFireLiteFirestore) {
    }

    isAuth() {
        return this.auth.isAuthenticated();
      }
    
      signin(email: string, pass: string) {
        return this.auth.signin(email, pass);
      }
    
      signup(email: string, pass: string) {
        return this.auth.signup(email, pass);
      }
    
    
      getCities() {
        return this.auth.uid().pipe(switchMap((uid) => {
          return this.fs.read(`${uid}`);
        }));
      }
    
      addCity(name: string) {
        return this.auth.uid()
          .pipe(switchMap((uid) => {
            return this.fs
              .write(`${uid}/${name}`, {name, added: new Date()})
              .pipe(first());
          }), first());
      }

}
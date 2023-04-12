import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {FireBaseService} from '../services/firebase.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public fb: FireBaseService, public router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.fb.isAuth().pipe(map(
      auth => {
        if (!auth) {
          return true;
        } else {
          this.router.navigate(['/']);
          return false;
        }
      }
    ));
  }

}

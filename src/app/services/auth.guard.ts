import {map, tap} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot, UrlTree,
} from '@angular/router';
import {Store} from "@ngrx/store";
import {AppState} from "../store/app.state";
import {isAuthenticated} from "../store/auth/auth.selector";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.store.select(isAuthenticated).pipe(
      map((authenticate) => {
        console.log('is authenticated: ', authenticate)
        if (!authenticate) {
          return this.router.createUrlTree(['auth/login']);
        }
        return true;
      })
    );
  }
}

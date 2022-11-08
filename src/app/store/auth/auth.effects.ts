import { exhaustMap, map, catchError, tap, mergeMap } from 'rxjs/operators';
import {
  autoLogin, autoLogout,
  loginStart,
  loginSuccess,
  signupStart,
  signupSuccess,
} from './auth.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import {ApiService} from "../../services/api.service";
import {setErrorMessage, setLoadingSpinner} from "../Shared/shared.actions";

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        return this.apiService.login(action.email, action.password).pipe(
          map((data: any) => {
            //login with json server
            if(action.password === data[0].password){
              this.store.dispatch(setLoadingSpinner({ status: false }));
              this.store.dispatch(setErrorMessage({ message: '' }));
              const user = data[0];
              this.apiService.setUserInLocalStorage(user);
              return loginSuccess({ user, redirect: true });
            } else {
              this.store.dispatch(setLoadingSpinner({ status: false }));
              const errorMessage = this.apiService.getErrorMessage(
                'INVALID_PASSWORD'
              );
              this.apiService.showError('Invalid Password or username');
              return setErrorMessage({ message: errorMessage });
            }

            //login with api
            /*this.store.dispatch(setLoadingSpinner({ status: false }));
            this.store.dispatch(setErrorMessage({ message: '' }));
            const user = this.apiService.formatUser(data);
            this.apiService.setUserInLocalStorage(user);
            return loginSuccess({ user, redirect: true });*/
          }),
          catchError((errResp) => {
            console.log(errResp)
            this.store.dispatch(setLoadingSpinner({ status: false }));
            const errorMessage = this.apiService.getErrorMessage(
              errResp.error.error.message
            );
            return of(setErrorMessage({ message: errorMessage }));
          })
        );
      })
    );
  });

  loginRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(...[loginSuccess, signupSuccess]),
        tap((action) => {
          this.store.dispatch(setErrorMessage({ message: '' }));
          if (action.redirect) {
            this.router.navigate(['/employees/list']);
          }
        })
      );
    },
    { dispatch: false }
  );

  signUp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signupStart),
      exhaustMap((action) => {
        return this.apiService.signUp(action.email, action.password).pipe(
          map((data) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            const user = this.apiService.formatUser(data);
            this.apiService.setUserInLocalStorage(user);
            return signupSuccess({ user, redirect: true });
          }),
          catchError((errResp) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            const errorMessage = this.apiService.getErrorMessage(
              errResp.error.error.message
            );
            return of(setErrorMessage({ message: errorMessage }));
          })
        );
      })
    );
  });

  autoLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(autoLogin),
      mergeMap((action) => {
        const user = this.apiService.getUserFromLocalStorage();
        return of(loginSuccess({ user, redirect: false }));
      })
    );
  });

  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(autoLogout),
        map((action) => {
          console.log('calling logout');
          this.apiService.logout();
          this.router.navigate(['auth/login']);
        })
      );
    },
    { dispatch: false }
  );
}

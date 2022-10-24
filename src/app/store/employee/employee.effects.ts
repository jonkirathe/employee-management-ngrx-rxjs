import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, exhaustMap, map, mergeMap, switchMap, tap, withLatestFrom} from "rxjs/operators";
import {Router} from "@angular/router";
import {loadEmployees, loadEmployeesFailure, loadEmployeesSuccess} from "./employee.action";
import {Store} from "@ngrx/store";
import {ApiService} from "../../services/api.service";
import {AppState} from "../app.state";
import { of, from } from 'rxjs';

@Injectable()
export class EmployeeEffects {
  constructor(private api: ApiService, private store: Store<AppState>, private router: Router, private actions$: Actions) {
  }

  loadEmployees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadEmployees),
      switchMap(() =>
        from(this.api.getEmployees()).pipe(
          map((employees) => loadEmployeesSuccess({ employees: employees })),
          catchError((error) => of(loadEmployeesFailure({ error })))
        )
      )
    )
  );
}

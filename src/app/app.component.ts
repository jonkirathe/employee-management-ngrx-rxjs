import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "./store/app.state";
import {Observable} from "rxjs";
import {getErrorMessage, getLoading} from "./store/Shared/shared.selector";
import {autoLogin} from "./store/auth/auth.actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'employee-management-ngrx-rxjs';
  showLoading!: Observable<boolean>;
  errorMessage!: Observable<string>;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.showLoading = this.store.select(getLoading);
    this.errorMessage = this.store.select(getErrorMessage);
    this.store.dispatch(autoLogin());
  }
}

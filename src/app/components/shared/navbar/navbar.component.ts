import { Component, OnInit } from '@angular/core';
import {autoLogout} from "../../../store/auth/auth.actions";
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/app.state";
import {Observable} from "rxjs";
import {isAuthenticated} from "../../../store/auth/auth.selector";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isAuthenticated!: Observable<boolean>;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.isAuthenticated = this.store.select(isAuthenticated);
  }

  onLogout(event: Event) {
    event.preventDefault();
    this.store.dispatch(autoLogout());
  }
}

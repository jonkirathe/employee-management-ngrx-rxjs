import { Component, OnInit } from '@angular/core';
import {debounceTime, filter} from "rxjs/operators";
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {loginStart} from "../../../store/auth/auth.actions";
import {setLoadingSpinner} from "../../../store/Shared/shared.actions";
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/app.state";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(private store: Store<AppState>) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
    /*this.form.valueChanges.pipe(
      debounceTime(500),
      filter(() => this.form.valid)
    ).subscribe(formState => {
      localStorage.setItem('formState', JSON.stringify(formState));
    });*/
  }

  ngOnInit(): void {
    const value = localStorage.getItem('formState');
    if(value){
      this.form.setValue(JSON.parse(value))
    }
  }

  submit() {
    const email = this.form.value.email;
    const password = this.form.value.password;
    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.store.dispatch(loginStart({ email, password }));
  }
}

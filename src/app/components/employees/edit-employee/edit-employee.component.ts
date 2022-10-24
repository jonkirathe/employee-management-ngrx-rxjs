import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppState} from "../../../store/app.state";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {
  form!: FormGroup;

  constructor(private store: Store<AppState>, fb: FormBuilder) {
    this.form = fb.group({
      address: ['', Validators.required,Validators.minLength(4)],
      officeLocation: ['', Validators.required, Validators.minLength(4)]
    });
  }

  ngOnInit(): void {
  }

  submit() {
    if (!this.form.valid) {
      return;
    }
    const payload = {
      address: this.form.value.address,
      officeLocation: this.form.value.officeLocation,
    };
    // this.store.dispatch(addProfile({ user: payload }));
  }
}

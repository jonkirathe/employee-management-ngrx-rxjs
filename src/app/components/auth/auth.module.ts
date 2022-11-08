import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {EffectsModule} from "@ngrx/effects";
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";



const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signUp',
    component: SignupComponent,
  },
];

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    EffectsModule.forFeature(),
    RouterModule.forChild(routes),
   /* EffectsModule.forFeature([AuthEffects]),
    StoreModule.forFeature(AUTH_STATE_NAME, AuthReducer),
    StoreModule.forFeature(SHARED_STATE_NAME, SharedReducer),*/
  ],
  providers: []
})
export class AuthModule { }

import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {EffectsModule} from "@ngrx/effects";
import {StoreModule} from "@ngrx/store";
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {AuthEffects} from "../../store/auth/auth.effects";
import {AUTH_STATE_NAME} from "../../store/auth/auth.selector";
import {AuthReducer} from "../../store/auth/auth.reducer";
import {SHARED_STATE_NAME} from "../../store/Shared/shared.selector";
import {SharedReducer} from "../../store/Shared/shared.reducer";



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
    RouterModule.forChild(routes),
    EffectsModule.forFeature([AuthEffects]),
    StoreModule.forFeature(AUTH_STATE_NAME, AuthReducer),
    StoreModule.forFeature(SHARED_STATE_NAME, SharedReducer),
  ],
  providers: []
})
export class AuthModule { }

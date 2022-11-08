import { createAction, props } from '@ngrx/store';
import {Auth} from "../../models/Auth";

export const LOGIN_START = '[auth page] login start';
export const LOGIN_SUCCESS = '[auth page] login Success';
export const LOGIN_FAIL = '[auth page] login Fail';

export const SIGNUP_START = '[auth page] signup start';
export const SIGNUP_SUCCESS = '[auth page] signup success';
export const AUTO_LOGIN_ACTION = '[auth page] auto login';
export const LOGOUT_ACTION = '[auth page] logout';

export const loginStart = createAction(
  LOGIN_START,
  props<{ email: string; password: string }>()
);
export const loginSuccess = createAction(
  LOGIN_SUCCESS,
  props<{ user: any; redirect: boolean }>()
);

export const loginFail = createAction(
  LOGIN_FAIL,
  props<{ error: string }>()
);

export const signupStart = createAction(
  SIGNUP_START,
  props<{ email: string; password: string }>()
);

export const signupSuccess = createAction(
  SIGNUP_SUCCESS,
  props<{ user: Auth; redirect: boolean }>()
);

export const autoLogin = createAction(AUTO_LOGIN_ACTION);
export const autoLogout = createAction(LOGOUT_ACTION);

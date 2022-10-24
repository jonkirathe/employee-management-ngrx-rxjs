import {IAuth} from "../../models/IAuth";

export interface AuthState {
  user: IAuth | null;
}

export const initialState: AuthState = {
  user: null,
};

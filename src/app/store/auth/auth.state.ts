import {Auth} from "../../models/Auth";

export interface AuthState {
  user: Auth | null;
}

export const initialState: AuthState = {
  user: null,
};

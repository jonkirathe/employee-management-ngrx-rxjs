import {EmployeeState} from "./employee/employee.state";
import {employeeReducer} from "./employee/employee.reducer";
import {EMPLOYEE_STATE_NAME} from "./employee/employee.selector";
import {AuthState} from "./auth/auth.state";
import {AUTH_STATE_NAME} from "./auth/auth.selector";
import {AuthReducer} from "./auth/auth.reducer";
import {SharedState} from "./Shared/shared.state";
import {SHARED_STATE_NAME} from "./Shared/shared.selector";
import {SharedReducer} from "./Shared/shared.reducer";

export interface AppState {
  [EMPLOYEE_STATE_NAME]: EmployeeState;
  [AUTH_STATE_NAME]: AuthState;
  [SHARED_STATE_NAME]: SharedState;
}

export const appReducer = {
  [EMPLOYEE_STATE_NAME]: employeeReducer,
  [AUTH_STATE_NAME]: AuthReducer,
  [SHARED_STATE_NAME]: SharedReducer
};

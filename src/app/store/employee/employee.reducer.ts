import {createReducer, on} from "@ngrx/store";
import {initialState} from "./employee.state";
import {loadEmployees, loadEmployeesFailure, loadEmployeesSuccess} from "./employee.action";

export const employeeReducer = createReducer(
  initialState,
  on(loadEmployees, (state) => ({ ...state, status: 'loading' })),
  on(loadEmployeesSuccess, (state, { employees }) => ({
    ...state,
    employees: employees,
    error: null,
    status: 'success',
  })),
  on(loadEmployeesFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  }))
);

import {createFeatureSelector, createSelector} from "@ngrx/store";
import {EmployeeState} from "./employee.state";
export const EMPLOYEE_STATE_NAME = 'employee';

const getEmployeeState = createFeatureSelector<EmployeeState>(EMPLOYEE_STATE_NAME);

export const selectAllEmployees = createSelector(
  getEmployeeState,
  (state: EmployeeState) => state.employees
);

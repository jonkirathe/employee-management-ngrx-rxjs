import {createAction, props} from "@ngrx/store";
import {Employee} from "../../models/Employee";

export const LOAD_EMPLOYEES_SUCCESS = '[employees page] load employees success';
export const LOAD_EMPLOYEES = '[employees page] load employees';
export const LOAD_EMPLOYEES_FAIL = '[employees page] load employees fail';

export const loadEmployees = createAction(LOAD_EMPLOYEES);

export const loadEmployeesSuccess = createAction(
  LOAD_EMPLOYEES_SUCCESS,
  props<{ employees: Employee[] }>()
);

export const loadEmployeesFailure = createAction(
  LOAD_EMPLOYEES_FAIL,
  props<{ error: string }>()
);

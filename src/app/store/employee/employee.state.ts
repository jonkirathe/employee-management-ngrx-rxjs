import {Employee} from "../../models/Employee";

export interface EmployeeState {
  employees: Employee[];
  error: string | null;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: EmployeeState = {
  employees: [],
  error: null,
  status: 'pending',
}

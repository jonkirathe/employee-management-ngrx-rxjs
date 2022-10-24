import {IEmployee} from "../../models/IEmployee";

export interface EmployeeState {
  employees: IEmployee[];
  error: string | null;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: EmployeeState = {
  employees: [],
  error: null,
  status: 'pending',
}

import { RootState } from '../../index';

const employees = (state: RootState) => state.employees;

export const employeesSelectors = {
  employees
};

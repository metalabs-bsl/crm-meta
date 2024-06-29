import { RootState } from '../../index';

const employees = (state: RootState) => state.employess;

export const employeesSelectors = {
  employees
};

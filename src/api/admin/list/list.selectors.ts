import { RootState } from '../../index';

const list = (state: RootState) => state.list;

export const listSelectors = {
  list,
  slectUpdate: (state: RootState) => list(state).update
};

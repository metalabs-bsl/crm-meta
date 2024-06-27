import { backgroundSlice } from './background/background.slice';
import { kanbanSlice } from './kanban/kanban.slice';
import { loginSlice } from './login/login.slice';
import { sidebarSlice } from './sidebar/sidebar.slice';

export const adminSlices = {
  [sidebarSlice.name]: sidebarSlice.reducer,
  [loginSlice.name]: loginSlice.reducer,
  [backgroundSlice.name]: backgroundSlice.reducer,
  [kanbanSlice.name]: kanbanSlice.reducer
};

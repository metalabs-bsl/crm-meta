import { employeesSlice } from './employees/employess.slice';
import { kanbanSlice } from './kanban/kanban.slice';
import { listSlice } from './list/list.slice';
import { loginSlice } from './login/login.slice';
import { sidebarSlice } from './sidebar/sidebar.slice';
import { modalSlice } from './modal/modals.slice'

export const adminSlices = {
  [sidebarSlice.name]: sidebarSlice.reducer,
  [loginSlice.name]: loginSlice.reducer,
  [employeesSlice.name]: employeesSlice.reducer,
  [kanbanSlice.name]: kanbanSlice.reducer,
  [listSlice.name]: listSlice.reducer,
  [modalSlice.name]: modalSlice.reducer
};

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { adminApiMiddlewares, adminApiReducers } from './admin/admin.api';
import { adminSlices } from './admin/admin.slice';

const rootReducer = combineReducers({
  ...adminApiReducers,
  ...adminSlices
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(...adminApiMiddlewares);
    }
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

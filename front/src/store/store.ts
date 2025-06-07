import { combineReducers, configureStore } from '@reduxjs/toolkit';

import reports from './slices/card-list-slices';
import user from './slices/user-slices';

const rootReducer = combineReducers({ reports, user });

const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production'
});

export { store };

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

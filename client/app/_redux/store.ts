import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from './services';
import { globalSlice } from './slices';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    global: globalSlice.reducer,
  },

  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from '@reduxjs/toolkit';
import searchReducer from '@/store/searchSlice';
import filtersReducer from '@/store/filterSlice';
import sortingReducer from '@/store/sortingSlice';
import randomReducer from '@/store/randomSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    filters: filtersReducer,
    sorting: sortingReducer,
    random: randomReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

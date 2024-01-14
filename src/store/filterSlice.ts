import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';

interface FiltersState {
  category: string;
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    category: 'all',
  } as FiltersState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
  },
});

export const { setCategory } = filtersSlice.actions;

export const selectCategory = (state: RootState) => state.filters.category;

export default filtersSlice.reducer;

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

interface SortingState {
  type: string;
}

const sortingSlice = createSlice({
  name: 'sorting',
  initialState: {
    type: 'relevance',
  } as SortingState,
  reducers: {
    setSortingType: (state, action: PayloadAction<string>) => {
      state.type = action.payload;
    },
  },
});

export const { setSortingType } = sortingSlice.actions;

export const selectSortingType = (state: RootState) => state.sorting.type;

export default sortingSlice.reducer;

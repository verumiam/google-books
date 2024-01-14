import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Book from '@/store/types';

interface SearchState {
  query: string;
  results: Book[];
  loading: boolean;
  currentIndex: number;
}

export const searchBooks = createAsyncThunk(
  'search/searchBooks',
  async ({
    query,
    filter,
    sort,
    currentIndex,
  }: {
    query: string;
    filter: string;
    sort: string;
    currentIndex: number;
  }) => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
    const apiUrl = `${process.env.NEXT_PUBLIC_GOOGLE_API_URL}?q=${query}+${filter}&key=${apiKey}&maxResults=10&orderBy=${sort}&startIndex=${currentIndex}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    return data.items || [];
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    query: '',
    results: [] as Book[],
    loading: false,
    currentIndex: 0,
  } as SearchState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    incSearchPage: (state) => {
      state.currentIndex += 30;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchBooks.fulfilled, (state, action) => {
        state.loading = false;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const relevantInfo = action.payload.map((book: any) => ({
          id: book.id,
          title: book.volumeInfo.title || '',
          authors: book.volumeInfo.authors || [],
          thumbnail: book.volumeInfo.imageLinks?.thumbnail,
          categories: book.volumeInfo.categories || [],
        }));

        if (state.currentIndex === 0) {
          state.results = relevantInfo;
        } else {
          state.results = [...state.results, relevantInfo];
        }
      })
      .addCase(searchBooks.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setQuery, incSearchPage } = searchSlice.actions;

export const selectSearch = (state: { search: SearchState }) => state.search;

export default searchSlice.reducer;

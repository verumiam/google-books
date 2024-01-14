import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Book from '@/store/types';

interface RandomBooksState {
  results: Book[];
  loading: boolean;
  currentIndex: number;
}

export const randomBooks = createAsyncThunk(
  'random/randomBooks',
  async ({
    filter,
    sort,
    currentIndex,
  }: {
    filter: string;
    sort: string;
    currentIndex: number;
  }) => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
    const apiUrl = `${process.env.NEXT_PUBLIC_GOOGLE_API_URL}?q=${filter}&key=${apiKey}&maxResults=30&orderBy=${sort}&startIndex=${currentIndex}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    return data.items || [];
  }
);

const randomBooksSlice = createSlice({
  name: 'random',
  initialState: {
    results: [] as Book[],
    loading: false,
    currentIndex: 0,
  } as RandomBooksState,
  reducers: {
    setQuery: (state, action) => {
      state.results = action.payload;
    },
    incRandomPage: (state) => {
      state.currentIndex += 30;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(randomBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(randomBooks.fulfilled, (state, action) => {
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
      .addCase(randomBooks.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setQuery, incRandomPage } = randomBooksSlice.actions;

export const selectRandomBooks = (state: { random: RandomBooksState }) => state.random;

export default randomBooksSlice.reducer;

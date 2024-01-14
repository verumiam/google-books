import { searchBooks } from '@/store/search/searchSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';

interface SearchBooksArgs {
  query: string;
  sort: string;
  filter: string;
  currentIndex: number;
}

const useSearchActions = () => {
  const dispatch = useDispatch<AppDispatch>();

  const search = async (query: string, sort: string, filter: string, currentIndex: number) => {
    try {
      await dispatch(
        searchBooks({ query, sort, filter, currentIndex } as SearchBooksArgs)
      ).unwrap();
    } catch (error) {
      return;
    }
  };

  return { search };
};

export default useSearchActions;

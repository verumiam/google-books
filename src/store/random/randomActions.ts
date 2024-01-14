import { useDispatch } from 'react-redux';
import { randomBooks } from '@/store/random/randomSlice';
import { AppDispatch } from '@/store/store';

interface RandomBooksArgs {
  sort: string;
  filter: string;
  currentIndex: number;
}

const useRandomActions = () => {
  const dispatch = useDispatch<AppDispatch>();

  const getRandomBooks = async (sort: string, filter: string, currentIndex: number) => {
    try {
      await dispatch(randomBooks({ sort, filter, currentIndex } as RandomBooksArgs));
    } catch (error) {
      return;
    }
  };

  return { getRandomBooks };
};

export default useRandomActions;

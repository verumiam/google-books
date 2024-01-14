'use client';

import { useDispatch, useSelector } from 'react-redux';
import { selectSortingType } from '@/store/sortingSlice';
import { selectCategory } from '@/store/filterSlice';
import { incSearchPage, selectSearch } from '@/store/search/searchSlice';
import BookCard from '@/components/shared/book-card';
import Container from '@/components/shared/container';
import classes from '@/components/shared/book-card/styles/book-mapping.module.scss';
import { incRandomPage, selectRandomBooks } from '@/store/random/randomSlice';
import { useEffect, useRef } from 'react';
import useRandomActions from '@/store/random/randomActions';
import BookSkeleton from './book-skeleton';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Button from '@/components/shared/button';
import { AppDispatch } from '@/store/store';
import ResultPanel from '../result-panel/result-panel';

function BookMapping() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { getRandomBooks } = useRandomActions();

  const sort = useSelector(selectSortingType);
  const filter = useSelector(selectCategory);
  const {
    results: searchData,
    loading: searchLoading,
    total: searchTotal,
  } = useSelector(selectSearch);
  const {
    results: randomData,
    loading: randomLoading,
    currentIndex: randomIndex,
    total: randomTotal,
  } = useSelector(selectRandomBooks);

  const searchQuery = useSearchParams().get('search');

  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;

      return;
    }

    if (!searchQuery) {
      router.push(`?sort=${sort}&filter=${filter}`, { scroll: false });
      getRandomBooks(sort, filter, randomIndex || 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, filter, searchQuery, randomIndex]);

  const loadMoreHandler = () => {
    !searchQuery ? dispatch(incRandomPage()) : dispatch(incSearchPage());
  };

  const checkData =
    (!searchLoading || !randomLoading) && (searchData.length > 0 || randomData.length > 0);

  return (
    <Container>
      {checkData && <ResultPanel total={searchQuery ? searchTotal : randomTotal} />}
      <div className={classes.list}>
        {searchLoading || randomLoading
          ? Array.from({ length: 30 }, (_, index) => <BookSkeleton key={index} />)
          : (searchQuery ? searchData : randomData)?.map((book) => (
              <BookCard key={book.id} {...book} />
            ))}
      </div>
      {checkData && (
        <Button className={classes.list_btn} onClick={loadMoreHandler}>
          Load more
        </Button>
      )}
    </Container>
  );
}

export default BookMapping;

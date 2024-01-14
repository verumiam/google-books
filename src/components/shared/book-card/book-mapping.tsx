'use client';

import { useDispatch, useSelector } from 'react-redux';
import { selectSortingType } from '@/store/sortingSlice';
import { selectCategory } from '@/store/filterSlice';
import { incSearchPage, selectSearch } from '@/store/searchSlice';
import BookCard from '@/components/shared/book-card';
import Container from '@/components/shared/container';
import classes from '@/components/shared/book-card/book-mapping.module.scss';
import { incRandomPage, selectRandomBooks } from '@/store/randomSlice';
import { useEffect } from 'react';
import useRandomActions from '@/store/randomActions';
import SkeletonCard from './skeleton-card';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Button from '@/components/shared/button';
import { AppDispatch } from '@/store/store';

function BookMapping() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { getRandomBooks } = useRandomActions();

  const sort = useSelector(selectSortingType);
  const filter = useSelector(selectCategory);

  const { results: searchData, loading: searchLoading } = useSelector(selectSearch);

  const {
    results: randomData,
    loading: randomLoading,
    currentIndex: randomIndex,
  } = useSelector(selectRandomBooks);

  const searchQuery = useSearchParams().get('search');

  useEffect(() => {
    if (!searchQuery) {
      router.push(`?sort=${sort}&filter=${filter}`, { scroll: false });
      getRandomBooks(sort, filter, randomIndex || 0);
    } else {
      router.push(`?search=${searchQuery}&sort=${sort}&filter=${filter}`, { scroll: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, filter, searchQuery, randomIndex]);

  const loadMoreHandler = () => {
    !searchQuery ? dispatch(incRandomPage()) : dispatch(incSearchPage());
  };

  return (
    <Container>
      <div className={classes.list}>
        {searchLoading || randomLoading
          ? Array.from({ length: 10 }, (_, index) => <SkeletonCard key={index} />)
          : (searchQuery ? searchData : randomData)?.map((book) => (
              <BookCard key={book.id} {...book} />
            ))}
      </div>
      {(!searchLoading || !randomLoading) && (searchData.length > 0 || randomData.length > 0) && (
        <Button className={classes.list_btn} onClick={loadMoreHandler}>
          Load more
        </Button>
      )}
    </Container>
  );
}

export default BookMapping;

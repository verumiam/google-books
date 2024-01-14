'use client';

import useSearchActions from '@/store/search/searchActions';
import classes from './search-input.module.scss';
import Loupe from '@/svgs/loupe.inline.svg';
import Button from '@/components/shared/button';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { selectSortingType } from '@/store/sortingSlice';
import { selectCategory } from '@/store/filterSlice';
import { selectSearch } from '@/store/search/searchSlice';

function SearchInput() {
  const router = useRouter();
  const { search } = useSearchActions();
  const { currentIndex } = useSelector(selectSearch);

  const [phrase, setPhrase] = useState<string>('');

  const searchParams = useSearchParams().get('search');
  const sort = useSelector(selectSortingType);
  const filter = useSelector(selectCategory);

  useEffect(() => {
    if (!searchParams) {
      setPhrase('');
    }
  }, [searchParams]);

  useEffect(() => {
    if (searchParams) {
      router.push(`?search=${searchParams}&sort=${sort}&filter=${filter}`);
      search(searchParams, sort, filter, currentIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, sort, filter, currentIndex]);

  const handleChangePhrase = (value: string) => {
    setPhrase(value);
  };

  const handleSearch = async () => {
    if (phrase) {
      router.push(`?search=${phrase}&sort=${sort}&filter=${filter}`);
      search(phrase, sort, filter, currentIndex);
    }
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      await handleSearch();
    }
  };

  return (
    <div className={classes.input}>
      <input
        className={classes.input_place}
        type="text"
        placeholder="Гарри поттер и кубок огня..."
        value={phrase}
        onChange={(e) => handleChangePhrase(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button className={classes.input_btn} onClick={handleSearch}>
        <Loupe className={classes.input_loupe} alt="" />
      </Button>
    </div>
  );
}

export default SearchInput;

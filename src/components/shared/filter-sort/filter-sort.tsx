'use client';

import { selectSortingType, setSortingType } from '@/store/sortingSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select, { StylesConfig, SingleValue } from 'react-select';

interface Option {
  value: string;
  label: string;
}

const options: Option[] = [
  { value: 'relevance', label: 'relevance' },
  { value: 'newest', label: 'newest' },
];

const customStyles: StylesConfig<Option, false> = {
  option: (provided, state) => ({
    ...provided,
    fontSize: '14px',
    color: state.isSelected ? 'white' : '#2aabee',
    backgroundColor: state.isSelected ? '#2aabee' : 'white',
    cursor: 'pointer',
  }),
  control: (provided) => ({
    ...provided,
    width: '200px',
    fontSize: '14px',
    borderRadius: '14px',
    height: '45px',
  }),
};

function FilterSort() {
  const dispatch = useDispatch();
  const sort = useSelector(selectSortingType);

  useEffect(() => {
    dispatch(setSortingType(sort));
  }, [sort, dispatch]);

  return (
    <Select
      instanceId="filter-sort"
      defaultValue={{ value: sort, label: sort }}
      options={options}
      styles={customStyles}
      onChange={(newValue: SingleValue<Option>) => {
        if (newValue) {
          dispatch(setSortingType(newValue.value));
        }
      }}
    />
  );
}

export default FilterSort;

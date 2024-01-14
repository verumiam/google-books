'use client';

import { selectCategory, setCategory } from '@/store/filterSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select, { StylesConfig, SingleValue } from 'react-select';

interface Option {
  value: string;
  label: string;
}

const options = [
  { value: 'all', label: 'all' },
  { value: 'art', label: 'art' },
  { value: 'biography', label: 'biography' },
  { value: 'computers', label: 'computers' },
  { value: 'history', label: 'history' },
  { value: 'medical', label: 'medical' },
  { value: 'poetry', label: 'poetry' },
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

function FilterCategory() {
  const dispatch = useDispatch();
  const category = useSelector(selectCategory);

  useEffect(() => {
    dispatch(setCategory(category));
  }, [category, dispatch]);

  return (
    <Select
      instanceId="filter-category"
      defaultValue={{ value: category, label: category }}
      styles={customStyles}
      options={options}
      onChange={(newValue: SingleValue<Option>) => {
        if (newValue) {
          dispatch(setCategory(newValue.value));
        }
      }}
    />
  );
}

export default FilterCategory;

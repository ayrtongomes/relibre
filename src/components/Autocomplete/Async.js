import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import throttle from 'lodash/throttle';
// import fetch from 'isomorphic-unfetch';

import AsyncSelect from 'react-select/async';

export default function Asynchronous() {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [inputValue, setInputValue] = React.useState('');
  const [value, setValue] = React.useState(null);

  const loading = open && options.length === 0;

  const formatTitle = q => {
    if (typeof q === 'string') {
      return q.replace(' ', '+');
    }
  };

  const searchCities = async searchTerm => {
    if (searchTerm === '') return [];

    return await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${formatTitle(
        searchTerm
      )}&orderBy=relevance`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }
    )
      .then(result => result.json())
      .then(data => {
        return data.items.map(book => {
          return {
            label: book.volumeInfo.title,
            value: book.id
          };
        });
      });

    //return [];
  };

  const promiseCityOptions = searchTerm =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(searchCities(searchTerm));
      }, 300);
    });

  return (
    <AsyncSelect
      cacheOptions
      defaultOptions
      styles={{
        control: base => ({
          ...base,
          fontSize: '18px',
          minHeight: '58px',
          boxShadow: 'inherit'
        }),
        valueContainer: base => ({
          ...base,
          padding: '0.7em 1em'
        }),
        option: (base, { isDisabled, isFocused, isSelected }) => ({
          ...base,
          fontSize: '18px !important',
          backgroundColor: isDisabled
            ? null
            : isSelected
            ? '#0066ff'
            : isFocused
            ? '#0066ff'
            : null,
          cursor: isDisabled ? 'not-allowed' : 'default',
          color: !isDisabled && (isSelected || isFocused) ? 'white' : '#414141',

          ':active': {
            ...base[':active'],
            backgroundColor: !isDisabled && (isSelected ? '#0066ff' : '#0066ff')
          }
        })
      }}
      onChange={selected => {
        console.log(selected);
        //onChange(selected.value);
      }}
      placeholder={'Digite o nome do livro'}
      loadOptions={promiseCityOptions}
      noOptionsMessage={() => null}
      loadingMessage={() => null}
    />
  );
}

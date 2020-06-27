import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
// @material core
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';

// @material - icons
import SearchIcon from '@material-ui/icons/Search';

// css
import styles from './styles.module.scss';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const SearchBox = ({ ...props }) => {
  const history = useHistory();
  return (
    <Paper className={styles.searchBox}>
      <InputBase
        type="search"
        className={styles.input}
        placeholder="Pesquise o título do livro"
        inputProps={{ 'aria-label': 'Pesquise o título do livro' }}
        //value={city}
      />
      <Button
        color="primary"
        className={styles.iconButton}
        aria-label="Search"
        onClick={() => {
          history.push('/troca');
        }}
      >
        <SearchIcon />
      </Button>
    </Paper>
  );
};

export default SearchBox;

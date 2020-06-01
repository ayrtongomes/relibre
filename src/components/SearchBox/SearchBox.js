import React, { useEffect, useState } from 'react';

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
  const [city, setCity] = useState(null);
  useEffect(() => {
    setCity(cookies.get('location') ? cookies.get('location').city : null);
  }, [cookies.get('location')]);

  return (
    <Paper className={styles.searchBox}>
      <InputBase
        type="search"
        className={styles.input}
        placeholder=" Buscar cidade"
        inputProps={{ 'aria-label': ' Buscar cidade' }}
        value={city}
      />
      <Button color="primary" className={styles.iconButton} aria-label="Search">
        <SearchIcon />
      </Button>
    </Paper>
  );
};

export default SearchBox;

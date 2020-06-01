import React from 'react';

// @material core
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';

// @material - icons
import SearchIcon from '@material-ui/icons/Search';

// css
import styles from './styles.module.scss';

class SearchBox extends React.Component {
  render() {
    return (
      <Paper className={styles.searchBox}>
        <InputBase
          type="search"
          className={styles.input}
          placeholder=" Buscar cidade"
          inputProps={{ 'aria-label': ' Buscar cidade' }}
        />
        <Button
          color="primary"
          className={styles.iconButton}
          aria-label="Search"
        >
          <SearchIcon />
        </Button>
      </Paper>
    );
  }
}

export default SearchBox;

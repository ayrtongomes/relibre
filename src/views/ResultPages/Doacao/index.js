import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../Components/Header.js';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: '60px',
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

export default function NavTabs({ index, ...props }) {
  const classes = useStyles();

  return (
    <div>
      <Header index={2} />
      Doacaozinha
    </div>
  );
}

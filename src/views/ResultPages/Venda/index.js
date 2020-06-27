import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../Components/Header.js';
import BookAd from 'components/Card/BookAd';
import Footer from 'components/Footer/Footer';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: '60px',
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    display: 'grid',
    margin: '0 auto',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1rem'
  },
  container: {
    maxWidth: '1140px',
    margin: '2rem auto'
  },
  toolbar: {
    height: '111px',
    width: '100%'
  }
}));

export default function NavTabs({ index, ...props }) {
  const classes = useStyles();

  return (
    <div>
      <Header index={3} />
      <div className={classes.toolbar}></div>
      <div className={classes.container}>
        <div>
          <div className={classes.gridList}>
            <BookAd name="Sebo Rei do Livro" />
            <BookAd name="Sebo Leitura Divina" />
            <BookAd name="Sebo do Carlito" />
            <BookAd name="Amazon Livros" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../Components/Header.js';
import Card from 'components/Card/BookCard';
import BookMatchCard from 'components/Card/BookMatchCard.js';
import BookAd from 'components/Card/BookAd.js';
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
      <Header index={0} />
      <div className={classes.toolbar}></div>
      <div className={classes.container}>
        <div>
          <div className={classes.gridList}>
            <BookMatchCard distance={6.2} name="Luna Lovegood Nox" />
            <Card distance={1.2} name="Roberto Carlos" />
            <Card distance={1.3} name="Kamado Tanjiro" />
            <Card distance={3.2} name="Luna Lovegood" />
            <Card distance={4.4} name="Helena Ravenclaw" />
            <Card distance={4.8} name="Tom Riddle" />
            <Card distance={4.8} name="Severo Snape" />
            <Card distance={5.1} name="Jonas Kahnwald" />
            <Card distance={5.5} name="Mikkel Nielsen" />
            <Card distance={5.6} name="Ulrich Tiedmann" />
            <BookAd name="Sebo Rei do Livro" />
            <Card distance={7.3} name="Regina Woller" />
            <Card distance={8.1} name="Noah Phillip" />
            <Card distance={9} name="Charlotte Taghnahaus" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

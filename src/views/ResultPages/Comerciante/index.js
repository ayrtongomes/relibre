import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../Components/Header.js';
import Footer from 'components/Footer/Footer';
import Card from 'components/Card/CardCompany';

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
    padding: '0 1rem',
    margin: '2rem auto',
    display: 'grid',
    gridTemplateColumns: '1fr',
    rowGap: '1rem',
    columnGap: '1rem'
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
      <Header index={4} />
      <div className={classes.toolbar}></div>

      <div className={classes.container}>
        {/* <div className={classes.gridList}> */}
        <Card
          name="Sebo Tio Chico"
          address="Rua Agostinho Carrara, 333 - Portão, Curitiba - PR"
        />
        <Card
          name="Livraria Novo Mundo"
          address="Rua Mikkel Nielse, 333 - Novo mundo, Curitiba - PR"
        />
        <Card
          name="Sebo Vale Verde"
          address="Rua Leonor Cardoso, 333 - Centro, Curitiba - PR"
        />
        {/* </div> */}
      </div>
      <Footer />
    </div>
  );
}

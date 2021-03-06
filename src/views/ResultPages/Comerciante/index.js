import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../Components/Header.js';
import Footer from 'components/Footer/Footer';
import Card from 'components/Card/CardCompany';
import { useBooks } from 'services/contexts/book.js';
import CircularProgress from '@material-ui/core/CircularProgress';

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
    maxWidth: '1240px',
    padding: '0 1rem',
    margin: '1rem auto',
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

  const { fetchBookStore } = useBooks();

  const [stores, setStores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const data = await fetchBookStore();
      if (data && data.length > 0) {
        setStores(data);
      }

      setIsLoading(false);
    }

    loadData();
  }, []);

  return (
    <div>
      <Header index={4} />
      <div className={classes.toolbar}></div>

      <div className={classes.container}>
        {isLoading ? (
          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <CircularProgress />
          </div>
        ) : stores && stores.length > 0 ? (
          stores.map((store, index) => {
            if (store) {
              return <Card key={`store-${index}`} data={store} />;
            }
          })
        ) : null}
        {/* </div> */}
      </div>
      <Footer />
    </div>
  );
}

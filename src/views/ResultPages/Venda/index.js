import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Header from '../Components/Header.js';
import BookAd from 'components/Card/BookAd';
import Footer from 'components/Footer/Footer';

import { useBooks } from '../../../services/contexts/book.js';
import { useAuth } from 'services/auth.js';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: '60px',
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    display: 'grid',
    margin: '0 auto',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '1rem'
  },
  container: {
    maxWidth: '1240px',
    margin: '1rem auto'
  },
  toolbar: {
    height: '111px',
    width: '100%'
  }
}));

export default function NavTabs({ index, ...props }) {
  const classes = useStyles();

  const { fetchPublicBooks, fetchBooks } = useBooks();
  const { user } = useAuth();

  const [books, setBooks] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const searchTerm = params.get('title');

  useEffect(() => {
    async function loadData() {
      const localUser = localStorage.getItem('@relibre:user');
      const parsedUser = localUser ? JSON.parse(localUser) : null;
      if (parsedUser && parsedUser.token) {
        const data = await fetchBooks('Venda', searchTerm);
        if (data) {
          setBooks(data);
        }
      } else {
        const data = await fetchPublicBooks('Venda', searchTerm);
        if (data && data.length > 0) {
          setBooks(data);
        }
      }
      setIsLoading(false);
    }

    loadData();
  }, []);

  return (
    <div>
      <Header
        index={3}
        searchParam={searchTerm ? `?title=${searchTerm}` : ''}
      />
      <div className={classes.toolbar}></div>
      <div className={classes.container}>
        <div>
          {isLoading ? (
            <div style={{ textAlign: 'center', marginTop: '60px' }}>
              <CircularProgress />
            </div>
          ) : (
            <div className={classes.gridList}>
              {books && books.length > 0
                ? books.map((book, index) => {
                    if (book && book.book && book.book.title) {
                      return <BookAd key={`book-${index}`} data={book} />;
                    }
                  })
                : null}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

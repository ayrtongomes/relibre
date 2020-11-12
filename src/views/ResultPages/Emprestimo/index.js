import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../Components/Header.js';
import Card from 'components/Card/BookCard';
import BookMatchCard from 'components/Card/BookMatchCard.js';
import BookAd from 'components/Card/BookAd.js';
import Footer from 'components/Footer/Footer';
import { useBooks } from '../../../services/contexts/book.js';
import { useAuth } from 'services/auth.js';
import { formatDistance } from 'utils';
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

  const { fetchPublicBooks, fetchBooks } = useBooks();
  const { user } = useAuth();

  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const localUser = localStorage.getItem('@relibre:user');
      const parsedUser = localUser ? JSON.parse(localUser) : null;
      if (parsedUser && parsedUser.token) {
        const data = await fetchBooks('Emprestar');
        if (data && data.length > 0) {
          setBooks(data);
        }
        console.log(data);
      } else {
        const data = await fetchPublicBooks('Emprestar');
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
      <Header index={1} />
      <div className={classes.toolbar}></div>
      <div className={classes.container}>
        <div>
          {isLoading ? (
            'Carregando'
          ) : (
            <div className={classes.gridList}>
              <BookMatchCard distance={6.2} name="Luna Lovegood Nox" />

              {books && books.length > 0
                ? books.map((book, index) => {
                    return <Card key={`book-${index}`} data={book} />;
                  })
                : null}
              <BookAd name="Sebo Rei do Livro" />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

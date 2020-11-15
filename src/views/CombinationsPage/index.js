import React, { useState, useEffect } from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// @material-ui/core components
import makeStyles from '@material-ui/core/styles/makeStyles';
// @material-ui/icons
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
// core components
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Parallax from 'components/Parallax/Parallax.js';
import BookMatchCard from 'components/Card/BookMatchCard.js';
import { useBooks } from 'services/contexts/book.js';

import profilePageStyle from 'assets/jss/material-kit-react/views/profilePage.js';

const useStyles = makeStyles(theme => ({
  ...profilePageStyle,
  gridList: {
    display: 'grid',
    margin: '0 auto',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1rem'
  },
  container: {
    maxWidth: 'auto',
    margin: '2rem auto',
    padding: '0 3rem 2rem'
  },
  toolbar: {
    height: '111px',
    width: '100%'
  }
}));

export default props => {
  const { fetchBooks } = useBooks();
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const dataMatches = await fetchBooks('Combinacao');
      if (dataMatches && dataMatches.length > 0) {
        setMatches(dataMatches);
      }
      console.log(dataMatches);

      setIsLoading(false);
    }

    loadData();
  }, []);

  const classes = useStyles();

  return (
    <div>
      <Parallax small filter image={require('assets/img/banner-home.png')} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={12}>
                <div className={classes.profile}>
                  <div className={classes.name} style={{ marginTop: '20px' }}>
                    <h1 className={classes.title}>Combinações</h1>
                    <h4>Encontramos o livro ideal para você!</h4>
                    <div>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        Todos os livros listados aqui são de usuários que querem
                        o livro que você tem e possuem o livro que você quer.
                        <br />
                        Agora é por sua conta! Basta entrar em contato com o
                        outro usuário e combinarem a melhor maneira de
                        realizarem a troca, empréstimo ou doação.
                      </Typography>
                    </div>
                  </div>
                </div>
              </GridItem>
              <Divider style={{ margin: '3rem 0', width: '100%' }} />
            </GridContainer>
            <div className={classes.container}>
              {isLoading ? (
                'Carregando...'
              ) : (
                <div>
                  {matches && matches.length > 0 ? (
                    <div className={classes.gridList}>
                      {matches.map((book, index) => {
                        return (
                          <BookMatchCard
                            key={`bookMatch-${index}`}
                            data={book}
                          />
                        );
                      })}
                    </div>
                  ) : (
                    'Nenhum resultado encontrado'
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

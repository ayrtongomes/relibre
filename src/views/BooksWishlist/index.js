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
import Table from 'components/Table';
import Autocomplete from 'components/Autocomplete/Async';
import Button from 'components/CustomButtons/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import CustomInput from 'components/CustomInput/CustomInput.js';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Email, Check, Phone, Book } from '@material-ui/icons';
import SnackbarContent from 'components/Snackbar/SnackbarContent.js';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useBooks } from 'services/contexts/book.js';
import { format } from 'date-fns';

import profilePageStyle from 'assets/jss/material-kit-react/views/profilePage.js';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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

function createData(title, author, date) {
  return { title, author, date };
}

const rows = [
  createData(
    'Harry Potter e as Relíquias da Morte',
    'J.K. Rowling',
    '30/06/2020'
  ),
  createData(
    'Superman: entre a foice e o martelo',
    'Frank Miller ',
    '30/06/2020'
  ),
  createData('Crônicas de Gelo e Fogo', 'G.R. Martin', '30/06/2020')
];

export default props => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);

  const { createBook, fetchBooks } = useBooks();

  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showNot, setShowNot] = React.useState(false);

  const showNotification = () => {
    setShowNot(true);
    setTimeout(x => {
      setShowNot(false);
    }, 6000);
  };

  useEffect(() => {
    async function loadData() {
      const data = await fetchBooks('Interesse');
      if (data && data.length > 0) {
        const formatted = data.map(b => {
          return {
            title: b.book.title,
            author:
              b.book.authors && b.book.authors.length > 0
                ? b.book.authors[0].name
                : '',
            type: b.types.map(type => type.description).join(', '),
            date: format(new Date(b.created_at), 'dd/MM/yyyy')
          };
        });
        console.log(formatted);
        setBooks(formatted);
      }
    }
    setIsLoading(false);

    loadData();
  }, [fetchBooks, showNot]);

  const getPayload = () => {
    return {
      images: [
        {
          image: selectedBook.volumeInfo.imageLinks.thumbnail
        }
      ],
      book: {
        description: '',
        code_integration: selectedBook.id,
        isbn_13: selectedBook.id,
        title: selectedBook.volumeInfo.title,
        maturity_rating: selectedBook.volumeInfo.maturityRating,
        authors: selectedBook.volumeInfo.authors
          ? selectedBook.volumeInfo.authors.map(a => {
              return { name: a };
            })
          : [],
        categories: selectedBook.volumeInfo.categories
          ? selectedBook.volumeInfo.categories.map(c => {
              return { name: c };
            })
          : []
      },
      types: [
        {
          description: 'Interesse'
        }
      ]
    };
  };

  const handleSubmit = async () => {
    setSaving(true);

    const payload = getPayload();
    try {
      const data = await createBook(payload);
      if (data) {
        await fetchBooks('Interesse');
        showNotification();
      }
    } catch (err) {
      //Handler error
    } finally {
      setSaving(false);
      setShowModal(false);
    }
  };

  const classes = useStyles();

  return (
    <div>
      <Parallax small filter image={require('assets/img/banner-home.png')} />
      {showNot ? (
        <SnackbarContent
          message={'Livro cadastrado com sucesso.'}
          color="success"
        />
      ) : null}
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={12}>
                <div style={{ textAlign: 'left' }} className={classes.profile}>
                  <div className={classes.name} style={{ marginTop: '0' }}>
                    <h2 className={classes.title}>Livros desejados</h2>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <div style={{ fontWeight: '300' }}>
                        <span>
                          Adicione, exclua e veja os livros que você cadastrou
                          na sua lista de desejos.
                        </span>
                      </div>
                      <Button
                        variant="contained"
                        color="primary"
                        size="md"
                        onClick={() => setShowModal(true)}
                        //type="submit"
                        //disabled={loggedIn || loggingIn}
                      >
                        Novo
                      </Button>
                    </div>
                  </div>
                </div>
              </GridItem>
              <Divider style={{ margin: '2rem 0', width: '100%' }} />
            </GridContainer>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={12}>
                {isLoading ? (
                  <div style={{ textAlign: 'center', marginTop: '60px' }}>
                    <CircularProgress />
                  </div>
                ) : (
                  <Table data={books} isWish />
                )}
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <Dialog
        open={showModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setShowModal(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {'Adicionar livro desejado'}
        </DialogTitle>
        <DialogContent>
          <GridContainer
            justify="left"
            style={{ width: '480px', height: '320px', overflow: 'hidden' }}
          >
            <GridItem xs={12} sm={12} style={{ overflow: 'hidden' }}>
              <Autocomplete
                onChange={selected => {
                  setSelectedBook({ ...selected });
                }}
              />
            </GridItem>
          </GridContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleSubmit()} color="primary">
            {saving ? (
              <CircularProgress size={30} color="white" />
            ) : (
              'Adicionar a lista de desejos'
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

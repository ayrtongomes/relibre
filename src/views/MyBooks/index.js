import React, { useState, useRef, useEffect } from 'react';
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
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import CustomInput from 'components/CustomInput/CustomInput.js';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Email, Check, Phone, Book } from '@material-ui/icons';
import SnackbarContent from 'components/Snackbar/SnackbarContent.js';
import CircularProgress from '@material-ui/core/CircularProgress';

import profilePageStyle from 'assets/jss/material-kit-react/views/profilePage.js';
import { useBooks } from 'services/contexts/book.js';
import { format } from 'date-fns';

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

function createData(title, author, type, date) {
  return { title, author, type, date };
}

const rows = [
  createData(
    'Harry Potter e a Pedra Filosofal',
    'J.K. Rowling',
    'Troca, Empréstimo',
    '30/06/2020'
  ),
  createData('Watchmen', 'Alan Moore', 'Troca, Empréstimo', '30/06/2020'),
  createData('O Hobbit', 'Tolkien', 'Troca, Venda', '30/06/2020'),
  createData(
    'Harry Potter e o Enigma do Príncipe',
    'J.K. Rowling',
    'Troca, Venda',
    '30/06/2020'
  )
];

const CHECK_TYPES = {
  21: 'Trocar',
  22: 'Doar',
  23: 'Emprestar'
};

export default props => {
  const classes = useStyles();

  const fileUpload = useRef();

  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [description, setDescription] = useState('');
  const [checked, setCheckd] = useState([]);

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
      const data = await fetchBooks();
      if (data && data.length > 0) {
        const formatted = data.map(b => {
          return {
            title: b.book.title,
            author:
              b.book.authors && b.book.authors.length > 0
                ? b.book.authors[0].name
                : '',
            type: b.types.map(type => type.description).join(', '),
            date: format(new Date(b.book.created_at), 'dd/MM/yyyy')
          };
        });
        console.log(formatted);
        setBooks(formatted);
      }
    }
    setIsLoading(false);

    loadData();
  }, [fetchBooks, showNot]);

  const handleToggle = value => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setCheckd(newChecked);
  };

  const getPayload = () => {
    return {
      images: [
        {
          image: selectedBook.volumeInfo.imageLinks.thumbnail
        }
      ],
      book: {
        description: description,
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
      types: checked.map(c => {
        return { description: CHECK_TYPES[c] };
      })
    };
  };

  const handleSubmit = async () => {
    setSaving(true);

    const payload = getPayload();
    try {
      const data = await createBook(payload);
      if (data) {
        await fetchBooks();
        showNotification();
      }
    } catch (err) {
      //Handler error
    } finally {
      setSaving(false);
      setShowModal(false);
    }
  };

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
                <div className={classes.profile}>
                  <div
                    className={classes.name}
                    style={{ marginTop: '0', textAlign: 'left' }}
                  >
                    <h2 className={classes.title}>Meus livros</h2>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <div style={{ fontWeight: '300' }}>
                        <span>
                          Adicione, altere e veja os livros que você possui.
                        </span>
                      </div>
                      <Button
                        variant="contained"
                        color="primary"
                        size="md"
                        onClick={() => setShowModal(true)}
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
                {isLoading ? 'Carregando...' : <Table data={books} />}
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
          {'Cadastro de livro'}
        </DialogTitle>
        <DialogContent>
          <GridContainer justify="left">
            <GridItem xs={12} sm={12}>
              <Autocomplete
                onChange={selected => {
                  setSelectedBook({ ...selected });
                }}
              />
            </GridItem>

            <GridItem xs={12} sm={12} md={6} lg={6}>
              <div className={classes.title}>
                <span
                  style={{
                    color: '#AAAAAA',
                    fontSize: '14px',
                    fontWeight: 300
                  }}
                >
                  Este livro, eu quero:
                </span>
              </div>
              <div
                className={
                  classes.checkboxAndRadio +
                  ' ' +
                  classes.checkboxAndRadioHorizontal
                }
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      tabIndex={-1}
                      onClick={() => handleToggle(21)}
                      checked={checked.indexOf(21) !== -1 ? true : false}
                      checkedIcon={<Check className={classes.checkedIcon} />}
                      icon={<Check className={classes.uncheckedIcon} />}
                      classes={{ checked: classes.checked }}
                    />
                  }
                  classes={{ label: classes.label }}
                  label="Trocar"
                />
              </div>
              <div
                className={
                  classes.checkboxAndRadio +
                  ' ' +
                  classes.checkboxAndRadioHorizontal
                }
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      tabIndex={-1}
                      onClick={() => handleToggle(22)}
                      checked={checked.indexOf(22) !== -1 ? true : false}
                      checkedIcon={<Check className={classes.checkedIcon} />}
                      icon={<Check className={classes.uncheckedIcon} />}
                      classes={{ checked: classes.checked }}
                    />
                  }
                  classes={{ label: classes.label }}
                  label="Emprestar"
                />
              </div>
              <div
                className={
                  classes.checkboxAndRadio +
                  ' ' +
                  classes.checkboxAndRadioHorizontal
                }
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      tabIndex={-1}
                      onClick={() => handleToggle(23)}
                      checked={checked.indexOf(23) !== -1 ? true : false}
                      checkedIcon={<Check className={classes.checkedIcon} />}
                      icon={<Check className={classes.uncheckedIcon} />}
                      classes={{ checked: classes.checked }}
                    />
                  }
                  classes={{ label: classes.label }}
                  label="Doar"
                />
              </div>
            </GridItem>
            {/* <GridItem
              xs={12}
              sm={12}
              md={6}
              lg={6}
              style={{ textAlign: 'right', marginTop: '15%' }}
            >
              <input
                ref={fileUpload}
                type="file"
                style={{ display: 'none' }}
                // onChange={e => {
                //   onChange([...e.target.files]);
                // }}
              />
              <Button
                color="info"
                type="file"
                // onClick={e => {
                //   fileUpload.click();
                // }}
              >
                Anexar imagem
              </Button>
            </GridItem> */}
            <GridItem xs={12} sm={12} md={12} lg={12}>
              <CustomInput
                labelText="Descrição"
                id="message"
                formControlProps={{
                  fullWidth: true,
                  className: classes.textArea
                }}
                inputProps={{
                  multiline: true,
                  rows: 5,
                  value: description,
                  onChange: e => setDescription(e.target.value)
                }}
              />
            </GridItem>
          </GridContainer>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleSubmit();
              setShowModal(false);
            }}
            color="primary"
          >
            {saving ? (
              <CircularProgress size={30} color="white" />
            ) : (
              'Finalizar cadastro'
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

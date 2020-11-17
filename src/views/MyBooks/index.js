import React, { useState, useRef, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
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
import NewBook from './new';
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

export default props => {
  const classes = useStyles();

  const { id: editId, view } = useParams();
  const history = useHistory();
  const fileUpload = useRef();

  const isEdit = view !== undefined && editId !== undefined;

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

  const [refreshControl, refreshControlSet] = React.useState(false);

  useEffect(() => {
    async function loadData() {
      const data = await fetchBooks();
      if (data && data.length > 0) {
        const formatted = data.map(b => {
          return {
            id: b.id,
            title: b.book.title,
            author:
              b.book.authors && b.book.authors.length > 0
                ? b.book.authors[0].name
                : '',
            type: b.types.map(type => type.description).join(', '),
            date: format(new Date(b.book.created_at), 'dd/MM/yyyy')
          };
        });
        setBooks(formatted);
      }
    }
    setIsLoading(false);

    loadData();
  }, [fetchBooks, refreshControl]);

  useEffect(() => {
    setShowModal(isEdit);
  }, [isEdit, editId]);

  return (
    <div>
      {view !== undefined ? null : (
        <>
          <Parallax
            small
            filter
            image={require('assets/img/banner-home.png')}
          />
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
                            onClick={() => {
                              setShowModal(true);
                              history.push('/minha-conta/meus-livros/new');
                            }}
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
        </>
      )}
      <Dialog
        open={showModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => {
          setShowModal(false);
          history.push('/minha-conta/meus-livros');
        }}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <NewBook
          {...props}
          view={view}
          id={editId}
          closeModal={() => {
            setShowModal(false);
            refreshControlSet(!refreshControl);
            history.push('/minha-conta/meus-livros');
          }}
        />
      </Dialog>
    </div>
  );
};

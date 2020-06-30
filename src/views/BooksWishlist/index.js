import React, { useState } from 'react';
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
import Button from 'components/CustomButtons/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import CustomInput from 'components/CustomInput/CustomInput.js';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Email, Check, Phone, Book } from '@material-ui/icons';
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

  const classes = useStyles();

  return (
    <div>
      <Parallax small filter image={require('assets/img/banner-home.png')} />
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
                <Table data={rows} isWish />
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
          <GridContainer justify="left" style={{ width: '480px' }}>
            <GridItem xs={12} sm={12}>
              <CustomInput
                labelText="Livro"
                id="name"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: 'text',
                  value: name,
                  onChange: event => setName(event.target.value),
                  endAdornment: (
                    <InputAdornment position="end">
                      <Book className={classes.inputIconsColor} />
                    </InputAdornment>
                  )
                }}
              />
            </GridItem>
          </GridContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowModal(false)} color="primary">
            Adicionar a lista de desejos
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

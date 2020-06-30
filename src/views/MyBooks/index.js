import React, { useState, useRef } from 'react';
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
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import CustomInput from 'components/CustomInput/CustomInput.js';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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

export default props => {
  const classes = useStyles();

  const fileUpload = useRef();

  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [checked, setCheckd] = useState([]);

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

  return (
    <div>
      <Parallax small filter image={require('assets/img/banner-home.png')} />
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
                <Table data={rows} />
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
            <GridItem
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
            </GridItem>
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
                  rows: 5
                }}
              />
            </GridItem>
          </GridContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowModal(false)} color="primary">
            Finalizar cadastro
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

import React from 'react';
// import { Redirect } from 'react-router-dom';
import formatISO from 'date-fns/formatISO';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';

// @material-ui/icons
import Email from '@material-ui/icons/Email';
import Phone from '@material-ui/icons/Phone';
import AccountBox from '@material-ui/icons/AccountBox';
import Check from '@material-ui/icons/Check';
import CircularProgress from '@material-ui/core/CircularProgress';

// core components
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Button from 'components/CustomButtons/Button.js';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardFooter from 'components/Card/CardFooter.js';
import CustomInput from 'components/CustomInput/CustomInput.js';
import Modal from 'components/Dialogs/CheckEmail.js';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';

import loginPageStyle from 'assets/jss/material-kit-react/views/loginPage.js';
// REDIX INIT
import compose from 'utils/compose';
import { useAuth } from 'services/auth';

import image from 'assets/img/banner-register.png';
import { REGEXES } from '../../utils/regex';

const useStyles = makeStyles(loginPageStyle);

export default function RegisterPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState('cardHidden');
  const { user, register } = useAuth();

  setTimeout(function() {
    setCardAnimation('');
  }, 700);

  const [name, nameSet] = React.useState('');
  const [email, emailSet] = React.useState('');
  const [birthDate, birthDateSet] = React.useState(null);
  const [phone, phoneSet] = React.useState('');
  const [password, passwordSet] = React.useState('');
  const [acceptedTerms, acceptedTermsSet] = React.useState(false);
  const [passwordConfirm, passwordConfirmSet] = React.useState(true);

  const [showModal, setShowModal] = React.useState(false);
  const [loading, loadingSet] = React.useState(false);
  const [error, errorSet] = React.useState(null);

  const validate = e => {
    e.preventDefault();

    let error = {};
    if (name === '' || name.length < 3) {
      error = {
        ...error,
        name: 'Nome inválido'
      };
    }

    if (email === '' || !REGEXES.email.test(email)) {
      error = {
        ...error,
        name: 'E-mail inválido'
      };
    }

    if (phone === '' || !REGEXES.phone.test(phone)) {
      error = {
        ...error,
        phone: 'Telefone inválido'
      };
    }

    if (password === '' || password.length < 5) {
      error = {
        ...error,
        password: 'Senha fraca'
      };
    }

    if (!acceptedTerms) {
      error = {
        ...error,
        terms: 'É necessário aceitar os termos'
      };
    }

    errorSet(error);
    if (
      error.name ||
      error.email ||
      error.email ||
      error.password ||
      error.terms ||
      !birthDate
    ) {
      return;
    } else {
      return submit(e);
    }
  };

  const submit = async e => {
    loadingSet(true);

    const payload = {
      name: name,
      login: email,
      phone: phone,
      password: password,
      birthDate: formatISO(new Date(birthDate))
    };

    const response = await register(payload);

    if (response && response.status === 'Sucesso') {
      setShowModal(true);
    }
    loadingSet(false);
  };

  const classes = useStyles();

  return (
    <div>
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: 'url(' + image + ')',
          backgroundSize: 'cover',
          backgroundPosition: 'top center'
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={6}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form} name="form" onSubmit={validate}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Cadastre-se agora!</h4>
                  </CardHeader>
                  <p className={classes.divider}>
                    Junte-se a nossa comunidade!
                  </p>
                  <CardBody>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <CustomInput
                          labelText="Nome"
                          id="name"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            type: 'text',
                            onChange: event => {
                              nameSet(event.target.value);
                              errorSet(value => ({ ...value, name: null }));
                            },
                            endAdornment: (
                              <InputAdornment position="end">
                                <AccountBox
                                  className={classes.inputIconsColor}
                                />
                              </InputAdornment>
                            ),
                            error: error && error.name ? true : false
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
                        <div style={{ paddingTop: '12px' }}>
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                              disableFuture
                              format="dd/MM/yyyy"
                              label="Data de nascimento"
                              views={['year', 'month', 'date']}
                              maxDate={
                                new Date(
                                  new Date().getFullYear() - 18,
                                  new Date().getMonth(),
                                  new Date().getDay()
                                )
                              }
                              maxDateMessage="Você precisa ser maior de idade"
                              invalidDateMessage="Data inválida"
                              value={birthDate}
                              onChange={birthDateSet}
                            />
                          </MuiPickersUtilsProvider>
                        </div>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
                        <CustomInput
                          labelText="Telefone"
                          id="phone"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            type: 'text',
                            onChange: event => {
                              phoneSet(event.target.value);
                              errorSet(value => ({ ...value, phone: null }));
                            },
                            endAdornment: (
                              <InputAdornment position="end">
                                <Phone className={classes.inputIconsColor} />
                              </InputAdornment>
                            ),
                            error: error && error.phone ? true : false
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={12}>
                        <CustomInput
                          labelText="Email"
                          id="email"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            type: 'email',
                            onChange: event => {
                              emailSet(event.target.value);
                              errorSet(value => ({ ...value, email: null }));
                            },
                            endAdornment: (
                              <InputAdornment position="end">
                                <Email className={classes.inputIconsColor} />
                              </InputAdornment>
                            ),
                            error: error && error.email ? true : false
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
                        <CustomInput
                          labelText="Senha"
                          id="password"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            type: 'password',
                            onChange: event => {
                              passwordSet(event.target.value);
                              errorSet(value => ({ ...value, password: null }));
                            },
                            endAdornment: (
                              <InputAdornment position="end">
                                <Icon className={classes.inputIconsColor}>
                                  lock_outline
                                </Icon>
                              </InputAdornment>
                            ),
                            error: error && error.password ? true : false
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
                        <CustomInput
                          labelText="Confirmar senha"
                          id="passwordConfirm"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            type: 'password',
                            onChange: event => {
                              if (event.target.value !== password) {
                                passwordConfirmSet(false);
                              } else {
                                passwordConfirmSet(true);
                              }
                            },
                            endAdornment: (
                              <InputAdornment position="end">
                                <Icon className={classes.inputIconsColor}>
                                  lock_outline
                                </Icon>
                              </InputAdornment>
                            ),
                            error: !passwordConfirm
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              onClick={() => acceptedTermsSet(value => !value)}
                              checked={acceptedTerms}
                              checkedIcon={
                                <Check className={classes.checkedIcon} />
                              }
                              icon={<Check className={classes.uncheckedIcon} />}
                              classes={{
                                checked: classes.checked,
                                root: classes.checkRoot
                              }}
                            />
                          }
                          label={
                            <span>
                              Eu concordo com{' '}
                              <a href="/termos" target="_blank">
                                os termos e a Política de Privacidade do Relibre
                              </a>
                              .
                            </span>
                          }
                        />
                      </GridItem>
                    </GridContainer>
                    {!passwordConfirm && (
                      <div style={{ textAlign: 'center' }}>
                        <Typography color="error">
                          {'As senhas não coincidem.'}
                        </Typography>
                      </div>
                    )}
                    {error && error.terms ? (
                      <div style={{ textAlign: 'center' }}>
                        <Typography color="error">{error.terms}</Typography>
                      </div>
                    ) : null}
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    {loading ? (
                      <CircularProgress size={30} />
                    ) : (
                      <Button color="primary" type="submit">
                        REGISTRAR
                      </Button>
                    )}
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Modal
          openModal={showModal}
          closeModal={() => {
            setShowModal(false);
            props.history.push('/login');
          }}
        />
      </div>
    </div>
  );
}

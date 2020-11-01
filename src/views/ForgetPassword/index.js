import React from 'react';
import { NavLink, Redirect, useLocation } from 'react-router-dom';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// @material-ui/icons
import Email from '@material-ui/icons/Email';
import CircularProgress from '@material-ui/core/CircularProgress';

// core components
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardFooter from 'components/Card/CardFooter.js';
import Danger from 'components/Typography/Danger.js';
import CustomInput from 'components/CustomInput/CustomInput.js';
import Button from 'components/CustomButtons/Button.js';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
import loginPageStyle from 'assets/jss/material-kit-react/views/loginPage.js';
import { makeStyles } from '@material-ui/core/styles';

import compose from 'utils/compose';

import image from 'assets/img/banner-register.png';

import Cookies from 'universal-cookie';
import { useAuth } from 'services/auth';

const cookies = new Cookies();

const useStyles = makeStyles(loginPageStyle);

const LoginPage = props => {
  const [cardAnimaton, setCardAnimation] = React.useState('cardHidden');
  const [email, emailSet] = React.useState('');
  const [loading, loadingSet] = React.useState(false);
  const [error, errorSet] = React.useState(false);
  const { user, login } = useAuth();

  setTimeout(function() {
    setCardAnimation('');
  }, 700);

  const classes = useStyles();

  const location = useLocation();

  const submit = async e => {
    e.preventDefault();
    // loadingSet(true);
    // if (email && password) {
    //   const { errors } = await login({
    //     login: email,
    //     password: password
    //   });
    //   if (errors && errors.length > 0) {
    //     errorSet(true);
    //   }
    // }
    // loadingSet(false);
  };

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
        <div className={classes.container} style={{ paddingTop: '20vh' }}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={6}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form} name="form" onSubmit={submit}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Esqueceu sua senha</h4>
                  </CardHeader>
                  <p className={classes.divider} style={{ fontWeight: 400 }}>
                    Digite seu e-mail abaixo, você receberá um link para
                    cadastrar uma nova senha.
                  </p>
                  <CardBody>
                    <CustomInput
                      labelText="E-mail"
                      id="email"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: 'email',
                        onChange: event => emailSet(event.target.value),
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                    {error ? <Danger>E-mail inválido</Danger> : null}
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    {loading ? (
                      <CircularProgress size={30} />
                    ) : (
                      <Button
                        color="primary"
                        type="submit"
                        //disabled={loggedIn || loggingIn}
                      >
                        Enviar
                      </Button>
                    )}
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

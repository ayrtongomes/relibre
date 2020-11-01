import React from 'react';
import { NavLink, Redirect, useLocation, useHistory } from 'react-router-dom';

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
  const [password, passwordSet] = React.useState('');
  const [loading, loadingSet] = React.useState(false);
  const [error, errorSet] = React.useState(false);
  const { user, login } = useAuth();

  setTimeout(function() {
    setCardAnimation('');
  }, 700);

  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const submit = async e => {
    e.preventDefault();
    loadingSet(true);
    //this.setState({ submitted: true });
    //const { dispatch } = this.props;
    if (email && password) {
      const { errors } = await login({
        login: email,
        password: password
      });
      if (errors && errors.length > 0) {
        errorSet(true);
      }
    }
    loadingSet(false);
  };

  if (user.token) {
    const redirect =
      location.state && location.state.from
        ? location.state.from.pathname
        : '/minha-conta/meu-perfil';

    return <Redirect to={redirect} />;
  }

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
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form} name="form" onSubmit={submit}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Login</h4>
                  </CardHeader>
                  <NavLink to="/register">
                    <p className={classes.divider}>
                      Não tem cadastro? Registre-se agora.
                    </p>
                  </NavLink>
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
                    <CustomInput
                      labelText="Senha"
                      id="pass"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: 'password',
                        onChange: event => passwordSet(event.target.value),
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        )
                      }}
                    />
                    {error ? (
                      <Danger>E-mail e/ou senha inválidos</Danger>
                    ) : null}
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    {loading ? (
                      <CircularProgress size={30} />
                    ) : (
                      <GridContainer justify="space-between">
                        <Button
                          simple
                          color="primary"
                          onClick={() => history.push('/forget-password')}
                        >
                          Esqueci a senha
                        </Button>
                        <Button
                          color="primary"
                          //size="md"
                          type="submit"
                          //disabled={loggedIn || loggingIn}
                        >
                          ENTRAR
                        </Button>
                      </GridContainer>
                    )}
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        {/* <Footer whiteFont /> */}
      </div>
    </div>
  );
};

export default LoginPage;

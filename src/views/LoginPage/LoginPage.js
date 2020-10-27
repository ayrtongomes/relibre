import React from 'react';
import { NavLink, Redirect, useLocation } from 'react-router-dom';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// @material-ui/icons
import Email from '@material-ui/icons/Email';
// core components
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardFooter from 'components/Card/CardFooter.js';
import Typography from '@material-ui/core/Typography';
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
  const { user, login } = useAuth();

  console.log(user);

  setTimeout(function() {
    setCardAnimation('');
  }, 700);

  const submit = async e => {
    e.preventDefault();
    //this.setState({ submitted: true });
    //const { dispatch } = this.props;
    if (email && password) {
      await login({ login: email, password: password });
    }
  };

  const classes = useStyles();

  const location = useLocation();

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
        {/* <img src={logo}></img> */}
        <div className={classes.container} style={{ paddingTop: '20vh' }}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form} name="form" onSubmit={submit}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Login</h4>
                    {/* <div className={classes.socialLine}>
                        <Button
                          justIcon
                          href="#pablo"
                          target="_blank"
                          color="transparent"
                          onClick={e => e.preventDefault()}
                        >
                          <i className={"fab fa-twitter"} />
                        </Button>
                        <Button
                          justIcon
                          href="#pablo"
                          target="_blank"
                          color="transparent"
                          onClick={e => e.preventDefault()}
                        >
                          <i className={"fab fa-facebook"} />
                        </Button>
                        <Button
                          justIcon
                          href="#pablo"
                          target="_blank"
                          color="transparent"
                          onClick={e => e.preventDefault()}
                        >
                          <i className={"fab fa-google-plus-g"} />
                        </Button>
                      </div>*/}
                  </CardHeader>
                  <NavLink to="/register">
                    <p className={classes.divider}>
                      Não tem cadastro? Registre-se agora.
                    </p>
                  </NavLink>
                  <CardBody>
                    <CustomInput
                      labelText="Login"
                      id="login"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: 'text',
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
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button
                      simple
                      color="primary"
                      size="lg"
                      type="submit"
                      //disabled={loggedIn || loggingIn}
                    >
                      ENTRAR
                    </Button>
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

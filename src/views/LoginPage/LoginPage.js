import React from 'react';
import { NavLink } from 'react-router-dom';

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

import compose from 'utils/compose';

import image from 'assets/img/banner-register.png';

import Cookies from 'universal-cookie';

const cookies = new Cookies();

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    //this.props.logout();

    this.state = {
      cardAnimaton: 'cardHidden',
      login: '',
      password: ''
    };
  }
  componentDidMount() {
    cookies.set('logged', false);
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    setTimeout(
      function() {
        this.setState({ cardAnimaton: '' });
      }.bind(this),
      700
    );
  }

  change(event, type) {
    switch (type) {
      case 'login':
        this.setState({ login: event.target.value });
        break;
      case 'password':
        this.setState({ password: event.target.value });
        break;
      default:
        break;
    }
  }
  submit = e => {
    e.preventDefault();
    this.setState({ submitted: true });
    const { login, password } = this.state;
    //const { dispatch } = this.props;
    if (login && password) {
      let obj = {
        login: login,
        senha: password
      };
      //this.props.login(obj);
    }
    localStorage.setItem('user', true);
    cookies.set('logged', true);
    this.props.history.push('/minha-conta/meu-perfil');
  };

  render() {
    const { classes, loggingIn, loggedIn, logginFailed } = this.props;

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
                <Card className={classes[this.state.cardAnimaton]}>
                  <form
                    className={classes.form}
                    name="form"
                    onSubmit={this.submit}
                  >
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
                          onChange: event => this.change(event, 'login'),
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
                          onChange: event => this.change(event, 'password'),
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
                    {logginFailed && (
                      <div style={{ textAlign: 'center' }}>
                        <Typography
                          color="error"
                          style={{ fontWeight: 'bold' }}
                        >
                          {'Usuário ou senha incorretos.'}
                        </Typography>
                      </div>
                    )}
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
  }
}

export default compose(withStyles(loginPageStyle))(LoginPage);

import React from 'react';
import { Route, NavLink } from 'react-router-dom';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
// @material-ui/icons
import Email from '@material-ui/icons/Email';
import People from '@material-ui/icons/People';
// core components
import Header from 'components/Header/Header.jsx';
import HeaderLinks from 'components/Header/HeaderLinks.jsx';
import Footer from 'components/Footer/Footer.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import Button from 'components/CustomButtons/Button.jsx';
import Card from 'components/Card/Card.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import CardFooter from 'components/Card/CardFooter.jsx';
import CustomInput from 'components/CustomInput/CustomInput.jsx';
import Typography from '@material-ui/core/Typography';

import loginPageStyle from 'assets/jss/material-kit-react/views/loginPage.jsx';

import { login, logout } from '../../redux/actions';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import compose from 'utils/compose';

import image from 'assets/img/bg7.jpg';
import logo from 'assets/img/logo-branco.png';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.props.logout();

    this.state = {
      cardAnimaton: 'cardHidden',
      login: '',
      password: ''
    };
  }
  componentDidMount() {
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
      this.props.login(obj);
    }
  };

  render() {
    const { classes, loggingIn, loggedIn, logginFailed, ...rest } = this.props;

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
          <div className={classes.container}>
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
                        Registre-se rapidamentchi.
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
                        disabled={loggedIn || loggingIn}
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

const mapStateToProps = state => {
  const { loggingIn, loggedIn, logginFailed } = state.authentication;

  return {
    loggingIn,
    loggedIn,
    logginFailed
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ login, logout }, dispatch);

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(loginPageStyle)
)(LoginPage);

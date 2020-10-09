import React from 'react';
// import { Redirect } from 'react-router-dom';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
// @material-ui/icons
import Email from '@material-ui/icons/Email';
import Phone from '@material-ui/icons/Phone';
import AccountBox from '@material-ui/icons/AccountBox';
// core components
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Button from 'components/CustomButtons/Button.js';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardFooter from 'components/Card/CardFooter.js';
import CustomInput from 'components/CustomInput/CustomInput.js';
import Typography from '@material-ui/core/Typography';

import loginPageStyle from 'assets/jss/material-kit-react/views/loginPage.js';
// REDIX INIT
import compose from 'utils/compose';

import image from 'assets/img/banner-register.png';

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: 'cardHidden',
      login: '',
      password: '',
      email: '',
      nome: '',
      passwordConfirm: null
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
      case 'nome':
        this.setState({ nome: event.target.value });
        break;
      case 'email':
        this.setState({ email: event.target.value });
        break;
      case 'login':
        this.setState({ login: event.target.value });
        break;
      case 'password':
        this.setState({ password: event.target.value });
        break;
      case 'passwordConfirm':
        if (event.target.value !== this.state.password)
          this.setState({ passwordConfirm: false });
        else this.setState({ passwordConfirm: true });
        break;
      default:
        break;
    }
  }

  submit = e => {
    e.preventDefault();
    this.props.history.push('/login');
    // this.setState({ submitted: true });
    // const { login, password, nome, email, passwordConfirm } = this.state;
    // //const { dispatch } = this.props;
    // if (passwordConfirm === true) {
    //   if (login && password && nome && email) {
    //     let obj = {
    //       nome: nome,
    //       email: email,
    //       senha: password,
    //       login: login
    //     };
    //     this.props.PostUser(obj);
    //   }
    // }
  };

  componentDidUpdate(prevProps, prevState) {
    // if (prevProps.userDataPost !== this.props.userDataPost) {
    //   console.log(this.props.userDataPost);
    //   document.location.href = '/login';
    // }
  }
  render() {
    const { classes } = this.props;
    const { passwordConfirm } = this.state;
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
              <GridItem xs={12} sm={12} md={4}>
                <Card className={classes[this.state.cardAnimaton]}>
                  <form
                    className={classes.form}
                    name="form"
                    onSubmit={this.submit}
                  >
                    <CardHeader color="primary" className={classes.cardHeader}>
                      <h4>Cadastre-se agora!</h4>
                    </CardHeader>
                    <p className={classes.divider}>
                      Junte-se a nossa comunidade!
                    </p>
                    <CardBody>
                      <CustomInput
                        labelText="Nome"
                        id="nome"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: 'text',
                          onChange: event => this.change(event, 'nome'),
                          endAdornment: (
                            <InputAdornment position="end">
                              <AccountBox className={classes.inputIconsColor} />
                            </InputAdornment>
                          )
                        }}
                      />
                      <CustomInput
                        labelText="Telefone"
                        id="phone"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: 'text',
                          onChange: event => this.change(event, 'phone'),
                          endAdornment: (
                            <InputAdornment position="end">
                              <Phone className={classes.inputIconsColor} />
                            </InputAdornment>
                          )
                        }}
                      />
                      <CustomInput
                        labelText="Email"
                        id="email"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: 'email',
                          onChange: event => this.change(event, 'email'),
                          endAdornment: (
                            <InputAdornment position="end">
                              <Email className={classes.inputIconsColor} />
                            </InputAdornment>
                          )
                        }}
                      />
                      <CustomInput
                        labelText="Senha"
                        id="password"
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
                      <CustomInput
                        labelText="Confirmar senha"
                        id="passwordConfirm"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: 'password',
                          onChange: event =>
                            this.change(event, 'passwordConfirm'),
                          endAdornment: (
                            <InputAdornment position="end">
                              <Icon className={classes.inputIconsColor}>
                                lock_outline
                              </Icon>
                            </InputAdornment>
                          )
                        }}
                      />
                      {passwordConfirm === false && (
                        <div style={{ textAlign: 'center' }}>
                          <Typography color="error">
                            {'As senhas não coincidem.'}
                          </Typography>
                        </div>
                      )}
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <Button simple color="primary" size="lg" type="submit">
                        CADASTRAR
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

export default compose(withStyles(loginPageStyle))(RegisterPage);

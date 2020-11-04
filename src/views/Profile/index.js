import React, { useState } from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// @material-ui/core components
import makeStyles from '@material-ui/core/styles/makeStyles';
// @material-ui/icons
import Divider from '@material-ui/core/Divider';

import Cookies from 'universal-cookie';

// core components
import Modal from 'components/Dialogs/LocationNotAllowed';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Parallax from 'components/Parallax/Parallax.js';
import CustomInput from 'components/CustomInput/CustomInput.js';
import Button from 'components/CustomButtons/Button.js';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Email, Person, Phone, LocationSearching } from '@material-ui/icons';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import Icon from '@material-ui/core/Icon';
import profilePageStyle from 'assets/jss/material-kit-react/views/profilePage.js';
import DateFnsUtils from '@date-io/date-fns';
import { formatISO, format } from 'date-fns';
import { useAuth } from 'services/auth';

const cookies = new Cookies();

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
  },
  geolocButton: {
    padding: '0.8rem 1.2rem'
  }
}));

export default props => {
  const classes = useStyles();
  const { user, fetchUser, updateUser } = useAuth();

  const [name, setName] = useState(user ? user.name : '');
  const [email, setEmail] = useState(user ? user.login : '');
  const [phone, setPhone] = useState(user && user.phone ? user.phone : '');
  const [address, setAddress] = useState(
    user && user.fullAddress ? user.fullAddress : ''
  );
  const [geoLoc, setGeoLoc] = useState({});

  const [selectedDate, handleDateChange] = useState(
    user && user.birthDate ? new Date() : undefined
  );
  const [showModal, setShowModal] = React.useState(false);

  //console.log(format(user.birthdate, 'dd/MM/yyyy'));
  React.useEffect(() => {
    async function loadData() {
      if (!user || !user.name) {
        const fullUser = await fetchUser();
        if (fullUser) {
          setName(fullUser.name);
          setEmail(fullUser.email);
          setPhone(fullUser.phones[0].number);
        }
      }
    }
    loadData();
  }, []);
  const submit = e => {
    e.preventDefault();
    // this.setState({ submitted: true });
    // const { login, password } = this.state;
    // //const { dispatch } = this.props;
    // if (login && password) {
    //   let obj = {
    //     login: login,
    //     senha: password
    //   };
    //   //this.props.login(obj);
    // }
    // cookies.set('logged', true);
    // this.props.history.push('/minha-conta/meu-perfil');
  };

  React.useEffect(() => {
    async function submitEdit() {
      if (geoLoc.lat && geoLoc.long) {
        await editUser();
      }
    }
    submitEdit();
  }, [geoLoc]);

  const getGeoLocation = async () => {
    await navigator.geolocation.getCurrentPosition(
      position => {
        let obj = {
          lat: position.coords.latitude,
          long: position.coords.longitude
        };
        setGeoLoc(obj);
        cookies.set('location', obj, { path: '/' });

        return { obj };
      },
      error => {
        if (error.code === 1) {
          setShowModal(true);
        }
      }
    );
  };

  const editUser = async () => {
    const payload = {
      name: name,
      //birthDate: formatISO(selectedDate),
      phones: [
        {
          number: phone
        }
      ],
      addresses: [
        {
          latitude: `${geoLoc.lat}`,
          longitude: `${geoLoc.long}`
        }
      ]
    };

    try {
      if (geoLoc.lat && geoLoc.lat) {
        const { data } = await updateUser(payload);
        console.log(data);
        if (data && data.name) {
          setAddress(data.addresses[0].full_address);
        }
      }
    } catch (err) {
      //Handle error
    }
  };
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
                    <h2 className={classes.title}>Meu perfil</h2>
                    <div style={{ fontWeight: '300' }}>
                      <span>Atualize suas informações pessoais.</span>
                    </div>
                  </div>
                </div>
              </GridItem>
              <Divider style={{ margin: '2rem 0', width: '100%' }} />
            </GridContainer>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={12}>
                <form className={classes.form} name="form" onSubmit={submit}>
                  <GridContainer justify="left">
                    <GridItem xs={12} sm={12} md={8} lg={8}>
                      <CustomInput
                        labelText="Nome"
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
                              <Person className={classes.inputIconsColor} />
                            </InputAdornment>
                          )
                        }}
                      />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={4} lg={4}>
                      <div style={{ paddingTop: '12px' }}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <DatePicker
                            disableFuture
                            openTo="year"
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
                            value={selectedDate}
                            onChange={handleDateChange}
                          />
                        </MuiPickersUtilsProvider>
                      </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6} lg={6}>
                      <CustomInput
                        labelText="E-mail"
                        id="email"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: 'email',
                          value: email,
                          disabled: true,
                          onChange: event => setEmail(event.target.value),
                          endAdornment: (
                            <InputAdornment position="end">
                              <Email className={classes.inputIconsColor} />
                            </InputAdornment>
                          )
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6} lg={6}>
                      <CustomInput
                        labelText="Telefone"
                        id="phone"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: 'text',
                          value: phone,
                          onChange: event => setPhone(event.target.value),
                          endAdornment: (
                            <InputAdornment position="end">
                              <Phone className={classes.inputIconsColor} />
                            </InputAdornment>
                          )
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={7} lg={7}>
                      <div style={{ display: 'flex' }}>
                        <CustomInput
                          labelText="Endereço"
                          id="address"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            type: 'text',
                            value: address,
                            disabled: true
                            //onChange: event => setPhone(event.target.value),
                            // endAdornment: (
                            //   <InputAdornment position="end">
                            //     <Phone className={classes.inputIconsColor} />
                            //   </InputAdornment>
                            // )
                          }}
                        />
                        <Button
                          simple
                          color="primary"
                          size="md"
                          type="submit"
                          startIcon={<LocationSearching />}
                          className={classes.geolocButton}
                          onClick={() => getGeoLocation()}
                          //disabled={loggedIn || loggingIn}
                        >
                          Usar geolocalização
                        </Button>
                      </div>
                    </GridItem>
                  </GridContainer>
                  <Button
                    variant="contained"
                    color="primary"
                    size="md"
                    type="submit"
                    //disabled={loggedIn || loggingIn}
                  >
                    Salvar
                  </Button>
                </form>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <Modal openModal={showModal} closeModal={() => setShowModal(false)} />
    </div>
  );
};

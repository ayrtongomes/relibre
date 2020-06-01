import React, { Suspense, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Route, Switch, Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';

import 'assets/scss/material-kit-react.scss?v=1.4.0';

import AdminLayout from 'views/Admin';
import Login from 'views/LoginPage/LoginPage';
import HomePage from 'views/HomePage/HomePage';
import RegisterPage from 'views/RegisterPage/RegisterPage';
import { PrivateRoute } from 'components/PrivateRoute.js';
//import AuthLayout from 'views/LoginPage';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

//import axios from 'axios';
import store from './redux/store';

let hist = createBrowserHistory();

const cookies = new Cookies();

//axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
// axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const App = () => {
  useEffect(() => {
    getGeoLocation();
  }, []);

  const getGeoLocation = async () => {
    await navigator.geolocation.getCurrentPosition(
      position => {
        let obj = {
          lat: position.coords.latitude,
          long: position.coords.longitude,
          city: 'Curitiba'
        };
        cookies.set('location', obj, { path: '/' });
      },
      error => {
        if (error.code === 1) {
          alert(
            'Não temos permissão de acesso a sua localização isso afetará sua experiência.'
          );
        }
      }
    );
    //return obj;
  };
  return (
    <Provider store={store}>
      <Suspense fallback={<div />}>
        <ConnectedRouter history={hist}>
          <Switch>
            <Route path="/home" component={HomePage} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={RegisterPage} />
            <PrivateRoute path="/client/" component={AdminLayout} />
            <Redirect from="/" to="/home" />
          </Switch>
        </ConnectedRouter>
      </Suspense>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

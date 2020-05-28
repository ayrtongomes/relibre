import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Route, Switch, Redirect } from 'react-router-dom';
import 'assets/scss/material-kit-react.scss?v=1.4.0';

import AdminLayout from 'views/Admin';
import Login from 'views/LoginPage';
import HomePage from 'views/HomePage';
import InstitutePage from 'views/InstitutePage/';
import ResultPage from 'views/ResultPage/';
import RegisterPage from 'views/RegisterPage/';
import { PrivateRoute } from 'components/PrivateRoute.jsx';
//import AuthLayout from 'views/LoginPage';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import axios from 'axios';
import store from './redux/store';

var hist = createBrowserHistory();

//axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
// axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const App = () => (
  <Provider store={store}>
    <Suspense fallback={<div />}>
      <ConnectedRouter history={hist}>
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/home" component={HomePage} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={RegisterPage} />
          <PrivateRoute path="/client/" component={AdminLayout} />
          {/* <Redirect from="/" to="/client/search" /> */}
        </Switch>
      </ConnectedRouter>
    </Suspense>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));

import React, { Suspense, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Modal from 'components/Dialogs/LocationNotAllowed';

import 'assets/scss/material-kit-react.scss?v=1.4.0';

import AdminLayout from 'views/Admin';
import Login from 'views/LoginPage/LoginPage';
import HomePage from 'views/HomePage/HomePage';
import RegisterPage from 'views/RegisterPage/RegisterPage';
//import ResultPage from 'views/ResultPage';
import Emprestimo from 'views/ResultPages/Emprestimo';
import Troca from 'views/ResultPages/Troca';
import Doacao from 'views/ResultPages/Doacao';
import Venda from 'views/ResultPages/Venda';
import Comerciante from 'views/ResultPages/Comerciante';
import CompanyProfile from 'views/CompanyProfilePage';
import { PrivateRoute } from 'components/PrivateRoute.js';
//import AuthLayout from 'views/LoginPage';

//import axios from 'axios';

let hist = createBrowserHistory();

const cookies = new Cookies();

//axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
// axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const App = () => {
  const [showModal, setShowModal] = React.useState(false);

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
          setShowModal(true);
        }
      }
    );
    //return obj;
  };
  return (
    <>
      {/* <Suspense fallback={<div />}> */}
      <BrowserRouter>
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/troca" component={Troca} />
          <Route path="/emprestimo" component={Emprestimo} />
          <Route path="/doacao" component={Doacao} />
          <Route path="/venda" component={Venda} />
          <Route path="/comerciante" component={Comerciante} />
          <Route path="/comerciante-info/tio-zico" component={CompanyProfile} />
          <PrivateRoute path="/minha-conta/" component={AdminLayout} />
          <Redirect from="/" to="/home" />
        </Switch>
      </BrowserRouter>
      {/* </Suspense> */}
      <Modal openModal={showModal} closeModal={() => setShowModal(false)} />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

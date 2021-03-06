import React, { Suspense, useEffect } from 'react';
import ReactDOM from 'react-dom';
// import { createBrowserHistory } from 'history';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Modal from 'components/Dialogs/LocationNotAllowed';
import AlertProvider, { alertOptions, AlertTemplate } from 'components/Alert';

import 'assets/scss/material-kit-react.scss?v=1.4.0';

import AdminLayout from 'views/Admin';
import Login from 'views/LoginPage/LoginPage';
import Terms from 'views/Terms';
import HomePage from 'views/HomePage/HomePage';
import RegisterPage from 'views/RegisterPage/RegisterPage';
//import ResultPage from 'views/ResultPage';
import Emprestimo from 'views/ResultPages/Emprestimo';
import Troca from 'views/ResultPages/Troca';
import Doacao from 'views/ResultPages/Doacao';
import Venda from 'views/ResultPages/Venda';
import Comerciante from 'views/ResultPages/Comerciante';
import CompanyProfile from 'views/CompanyProfilePage';
import ChangePassword from 'views/ChangePassword';
import ForgetPassword from 'views/ForgetPassword';
import { PrivateRoute } from 'components/PrivateRoute.js';
//import AuthLayout from 'views/LoginPage';
import { dashRoutes } from 'views/routes.js';

import Provider from 'services/contexts';
import { useAuth } from 'services/auth';
// let hist = createBrowserHistory();

const cookies = new Cookies();

//axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
// axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const App = () => {
  const [showModal, setShowModal] = React.useState(false);
  // const [redirect, setRedirect] = React.useState(false);

  // const { logout } = useAuth();

  // useEffect(() => {
  //   function handleUserLocalData(event) {
  //     if (event.key === '@relibre:user' && event.newValue === '') {
  //       logout();
  //       setRedirect(true);
  //     }
  //   }

  //   function createEvent() {
  //     window.addEventListener('storage', handleUserLocalData);
  //   }

  //   createEvent();
  // }, []);

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

  const getRoutes = () => {
    return dashRoutes.map((prop, key) => {
      if (prop.layout === '/minha-conta') {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  // useEffect(() => {
  //   async function loadData() {
  //     const data = await getContacts();
  //     console.log(data);
  //   }
  //   loadData();
  // }, []);

  return (
    <>
      {/* <Suspense fallback={<div />}> */}
      <BrowserRouter>
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/termos" component={Terms} />
          <Route path="/change-password" component={ChangePassword} />
          <Route path="/forget-password" component={ForgetPassword} />

          <Route path="/troca" component={Troca} />
          <Route path="/emprestimo" component={Emprestimo} />
          <Route path="/doacao" component={Doacao} />
          <Route path="/venda" component={Venda} />
          <Route path="/comerciante/:id" component={CompanyProfile} />
          <Route path="/comerciante" component={Comerciante} />
          <PrivateRoute redirect={false}>
            <AdminLayout>{getRoutes(dashRoutes)}</AdminLayout>
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
      {/* </Suspense> */}
      <Modal openModal={showModal} closeModal={() => setShowModal(false)} />
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <AlertProvider template={AlertTemplate} {...alertOptions}>
      <Provider>
        <App />
      </Provider>
    </AlertProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

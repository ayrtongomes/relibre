import React from 'react';

// import cx from 'classnames';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
// @material-ui/core components
import makeStyles from '@material-ui/core/styles/makeStyles';
import Footer from 'components/Footer/Footer.js';
import Sidebar from 'components/Sidebar';
import Header from 'components/Header/Header.js';
import HeaderLinks from 'components/Header/HeaderLinks';
import { dashRoutes } from 'views/routes.js';
import { useAuth } from 'services/auth';

// Utils
import compose from 'utils/compose';

import appStyle from 'assets/jss/material-kit-react/layouts/adminStyle.js';

const useStyles = makeStyles(appStyle);

const Main = props => {
  const classes = useStyles();
  const { children } = props;
  const mainPanel = classes.mainPanel;

  const { logout } = useAuth();
  const [redirect, setRedirect] = React.useState(false);

  React.useEffect(() => {
    function handleUserLocalData(event) {
      if (event.key === '@relibre:user' && event.newValue === '') {
        logout();
        setRedirect(true);
      }
    }

    function createEvent() {
      window.addEventListener('storage', handleUserLocalData);
    }

    createEvent();
  }, []);
  if (redirect) {
    return <Redirect to={{ pathname: '/login' }}></Redirect>;
  }
  return (
    <div className={classes.wrapper}>
      <Header
        brand="relibre"
        rightLinks={<HeaderLinks />}
        fixed
        noMaxWidth
        color="dark"
        changeColorOnScroll={{
          height: 400,
          color: 'white'
        }}
      />
      <Sidebar routes={dashRoutes} />
      <div className={mainPanel}>
        <div className={classes.content}>
          <div className={classes.container}>{children}</div>
        </div>
      </div>
    </div>
  );
};
export default Main;

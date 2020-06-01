import React from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// react components for routing our app without refresh
import { Link } from 'react-router-dom';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// @material-ui/icons
// core components

import Header from 'components/Header/Header.js';
import HeaderLinks from 'components/Header/HeaderLinks';
import Footer from 'components/Footer/Footer.js';

import componentsStyle from 'assets/jss/material-kit-react/views/components.js';

class Main extends React.Component {
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <Header
          brand="relibre"
          rightLinks={<HeaderLinks />}
          fixed
          color="dark"
          changeColorOnScroll={{
            height: 400,
            color: 'white'
          }}
          {...rest}
        />
        <Footer />
      </div>
    );
  }
}

export default withStyles(componentsStyle)(Main);

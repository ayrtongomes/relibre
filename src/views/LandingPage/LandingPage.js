import React from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';

// @material-ui/icons

// core components
import Header from 'components/Header/Header.js';
import Footer from 'components/Footer/Footer.js';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Button from 'components/CustomButtons/Button.js';
import HeaderLinks from 'components/Header/HeaderLinks';
import Parallax from 'components/Parallax/Parallax.js';

import landingPageStyle from 'assets/jss/material-kit-react/views/landingPage.js';

// Sections for this page
import ProductSection from './Sections/ProductSection.js';
import TeamSection from './Sections/TeamSection.js';
import WorkSection from './Sections/WorkSection.js';

const dashboardRoutes = [];

class LandingPage extends React.Component {
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
        <Parallax
          filter
          image={require('assets/img/bg4.jpg')}
          style={{ height: '300px' }}
        >
          <div className={classes.container}></div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <ProductSection />
            {/* <TeamSection />
            <WorkSection /> */}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(landingPageStyle)(LandingPage);

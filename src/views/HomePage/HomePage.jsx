import React from 'react';
//
import PropTypes from 'prop-types';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// core components

import Header from 'components/Header/Header.jsx';
import HeaderLinks from 'components/Header/HeaderLinks.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import Parallax from 'components/Parallax/Parallax.jsx';

import componentsStyle from 'assets/jss/material-kit-react/views/components.jsx';
import SearchBox from 'components/SearchBox/SearchBox';

class HomePage extends React.Component {
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
        <Parallax image={require('assets/img/banner-home.png')}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem>
                <div className={classes.brand}>
                  <SearchBox />
                </div>
              </GridItem>
            </GridContainer>
          </div>
          {/* <Footer /> */}
        </Parallax>
      </div>
    );
  }
}
HomePage.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(componentsStyle)(HomePage);

import React from 'react';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// core components

import Header from 'components/Header/Header.js';
import HeaderLinks from 'components/Header/HeaderLinks';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Parallax from 'components/Parallax/Parallax.js';

import componentsStyle from 'assets/jss/material-kit-react/views/components.js';
import SearchBox from 'components/SearchBox/SearchBox';

const HomePage = ({ classes, ...rest }) => {
  return (
    <div>
      <Header
        brand="relibre"
        rightLinks={<HeaderLinks />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 400,
          color: 'white'
        }}
        {...rest}
      />
      <Parallax image={require('assets/img/banner-home.png')}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem style={{ maxWidth: '60rem', margin: 'auto' }}>
              <h1>Descubra pessoas para trocar livros próximas à você</h1>
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
};
export default withStyles(componentsStyle)(HomePage);

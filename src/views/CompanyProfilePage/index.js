import React from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// @material-ui/core components
import makeStyles from '@material-ui/core/styles/makeStyles';
// @material-ui/icons
import Star from '@material-ui/icons/Star';
import Book from '@material-ui/icons/Book';
import RoomRounded from '@material-ui/icons/RoomRounded';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
// core components
import Header from 'components/Header/Header.js';
import Footer from 'components/Footer/Footer.js';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import HeaderLinks from 'components/Header/HeaderLinks';
import NavPills from 'components/NavPills/NavPills.js';
import Parallax from 'components/Parallax/Parallax.js';
import BookAd from 'components/Card/BookAd.js';

import profilePageStyle from 'assets/jss/material-kit-react/views/profilePage.js';

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
  }
}));

export default props => {
  const classes = useStyles();
  // const imageClasses = classNames(
  //   classes.imgRaised,
  //   classes.imgRoundedCircle,
  //   classes.imgFluid
  // );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
  return (
    <div>
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
      <Parallax small filter image={require('assets/img/banner-home.png')} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={12}>
                <div className={classes.profile}>
                  <div className={classes.name} style={{ marginTop: '20px' }}>
                    <h1 className={classes.title}>Sebo Tio Chico</h1>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <RoomRounded />
                      <h4>
                        Rua Agostinho Carrara, 333 - Portão, Curitiba - PR
                      </h4>
                    </div>
                    <div
                      style={{
                        width: '80%',
                        margin: '0 auto'
                      }}
                    >
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book.
                      </Typography>
                    </div>
                  </div>
                </div>
              </GridItem>
              <Divider style={{ margin: '3rem 0', width: '85%' }} />
            </GridContainer>
            <div className={classes.container}>
              <div>
                <div className={classes.gridList}>
                  <BookAd name="Sebo Tio Chico" />
                  <BookAd name="Sebo Tio Chico" />
                  <BookAd name="Sebo Tio Chico" />
                  <BookAd name="Sebo Tio Chico" />
                  <BookAd name="Sebo Tio Chico" />
                  <BookAd name="Sebo Tio Chico" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

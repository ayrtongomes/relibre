import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
import Parallax from 'components/Parallax/Parallax.js';
import BookAd from 'components/Card/BookAd.js';
import { useBooks } from 'services/contexts/book.js';
import CircularProgress from '@material-ui/core/CircularProgress';
import { formatAddress } from 'utils';

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
  const { id } = useParams();

  const { fetchBookStoreById } = useBooks();

  const [store, setStore] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const { data } = await fetchBookStoreById(id);
      if (data && data.id) {
        console.log(data);
        setStore(data);
      }

      setIsLoading(false);
    }

    loadData();
  }, []);

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
                {isLoading ? (
                  <div style={{ textAlign: 'center', marginTop: '60px' }}>
                    <CircularProgress />
                  </div>
                ) : (
                  <div className={classes.profile}>
                    <div className={classes.name} style={{ marginTop: '20px' }}>
                      <h1 className={classes.title}>{store.name}</h1>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <RoomRounded />
                        <h4>{formatAddress(store.addresses[0])}</h4>
                      </div>
                      <div>
                        <b>Telefone:</b>{' '}
                        <span style={{ fontWeight: 300 }}>{store.phone}</span>
                        {' | '}
                        <b>E-mail:</b>{' '}
                        <span style={{ fontWeight: 300 }}>{store.login}</span>
                        {' | '}
                        <b>Site:</b>{' '}
                        {store.webSite ? (
                          <>
                            <a
                              style={{ fontWeight: 300 }}
                              href={store.webSite}
                              target="_blank"
                            >
                              {store.webSite}
                            </a>{' '}
                          </>
                        ) : null}
                      </div>
                      <div
                        style={{
                          width: '80%',
                          margin: '12px auto'
                        }}
                      >
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {store.description}
                        </Typography>
                      </div>
                    </div>
                  </div>
                )}
              </GridItem>
              <Divider style={{ margin: '3rem 0', width: '85%' }} />
            </GridContainer>
            <div className={classes.container}>
              <div>
                <div className={classes.gridList}>
                  {/* <BookAd name="Sebo Tio Chico" />
                  <BookAd name="Sebo Tio Chico" />
                  <BookAd name="Sebo Tio Chico" />
                  <BookAd name="Sebo Tio Chico" />
                  <BookAd name="Sebo Tio Chico" />
                  <BookAd name="Sebo Tio Chico" /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

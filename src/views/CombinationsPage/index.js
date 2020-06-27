import React from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// @material-ui/core components
import makeStyles from '@material-ui/core/styles/makeStyles';
// @material-ui/icons
import Star from '@material-ui/icons/Star';
import Book from '@material-ui/icons/Book';
import Comment from '@material-ui/icons/Comment';
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
import BookMatchCard from 'components/Card/BookMatchCard.js';

import studio1 from 'assets/img/examples/studio-1.jpg';
import studio2 from 'assets/img/examples/studio-2.jpg';
import studio3 from 'assets/img/examples/studio-3.jpg';
import studio4 from 'assets/img/examples/studio-4.jpg';
import studio5 from 'assets/img/examples/studio-5.jpg';
import work1 from 'assets/img/examples/olu-eletu.jpg';
import work2 from 'assets/img/examples/clem-onojeghuo.jpg';
import work3 from 'assets/img/examples/cynthia-del-rio.jpg';
import work4 from 'assets/img/examples/mariya-georgieva.jpg';
import work5 from 'assets/img/examples/clem-onojegaw.jpg';

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
      <Parallax small filter image={require('assets/img/banner-home.png')} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={12}>
                <div className={classes.profile}>
                  <div className={classes.name} style={{ marginTop: '20px' }}>
                    <h1 className={classes.title}>Combinações</h1>
                    <h4>Encontramos o livro ideal para você!</h4>
                    <div>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        Todos os livros listados aqui são de usuários que querem
                        o livro que você tem e possuem o livro que você quer.
                        <br />
                        Agora é por sua conta! Basta entrar em contato com o
                        outro usuário e combinarem a melhor maneira de
                        realizarem a troca, empréstimo ou doação.
                      </Typography>
                    </div>
                  </div>
                </div>
              </GridItem>
              <Divider style={{ margin: '3rem 0', width: '100%' }} />
            </GridContainer>
            <div className={classes.container}>
              <div>
                <div className={classes.gridList}>
                  <BookMatchCard distance={6.2} name="Luna Lovegood Nox" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

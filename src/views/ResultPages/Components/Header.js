import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Header from 'components/Header/Header.js';
import HeaderLinks from 'components/Header/HeaderLinks';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { container } from 'assets/jss/material-kit-react.js';
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    position: 'fixed',
    width: '100%',
    zIndex: 1200
  },
  labelRoot: {
    fontFamily: "'Inter', 'Roboto', sans-serif !important",
    fontWeight: 600
  },
  appBar: {
    backgroundColor: '#fff',
    color: '#5271ff',
    zIndex: 1200,
    boxShadow:
      '0 4px 18px 0px rgba(0, 0, 0, 0.12), 0 7px 10px -5px rgba(0, 0, 0, 0.15)',
    transition: 'all 150ms ease 0s'
  },
  container: {
    ...container,
    minHeight: '50px',
    flex: '1',
    alignItems: 'center',
    justifyContent: 'space-between',
    display: 'flex',
    flexWrap: 'nowrap'
  },
  toolbar: {
    height: '61px',
    width: '100%'
  }
}));

export default function NavTabs({ index, searchParam = '', ...props }) {
  const classes = useStyles();

  const width = window.innerWidth;

  return (
    <div className={classes.root}>
      <Header
        brand="relibre"
        rightLinks={<HeaderLinks />}
        fixed
        color="white"
        changeColorOnScroll={{
          height: 400,
          color: 'white'
        }}
      />
      {width < 768 ? null : (
        <>
          <div className={classes.toolbar}></div>
          <AppBar position="static" classes={{ root: classes.appBar }}>
            <Tabs
              variant="fullWidth"
              value={index}
              //onChange={handleChange}
              aria-label="nav tabs example"
              className={classes.container}
              centered
            >
              <Tab
                classes={{ root: classes.labelRoot }}
                label="Trocas"
                component={Link}
                to={`/troca${searchParam}`}
              />
              <Tab
                classes={{ root: classes.labelRoot }}
                label="Empréstimos"
                component={Link}
                to={`/emprestimo${searchParam}`}
              />
              <Tab
                classes={{ root: classes.labelRoot }}
                label="Doações"
                component={Link}
                to={`/doacao${searchParam}`}
              />
              <Tab
                classes={{ root: classes.labelRoot }}
                label="Vendas"
                component={Link}
                to={`/venda${searchParam}`}
              />
              <Tab
                classes={{ root: classes.labelRoot }}
                label="Comerciantes"
                component={Link}
                to="/comerciante"
              />
            </Tabs>
          </AppBar>
        </>
      )}
    </div>
  );
}

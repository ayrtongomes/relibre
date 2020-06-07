import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Header from 'components/Header/Header.js';
import HeaderLinks from 'components/Header/HeaderLinks';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: '60px',
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  labelRoot: {
    fontFamily: "'Fira Sans', 'Roboto', sans-serif !important",
    fontWeight: 600
  },
  appBar: {
    backgroundColor: '#fff',
    color: '#5271ff',
    boxShadow:
      '0 4px 18px 0px rgba(0, 0, 0, 0.12), 0 7px 10px -5px rgba(0, 0, 0, 0.15)',
    transition: 'all 150ms ease 0s'
  }
}));

export default function NavTabs({ index, ...props }) {
  const classes = useStyles();

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

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
      <AppBar position="static" classes={{ root: classes.appBar }}>
        <Tabs
          variant="fullWidth"
          value={index}
          //onChange={handleChange}
          aria-label="nav tabs example"
        >
          <Tab
            classes={{ root: classes.labelRoot }}
            label="Trocas"
            component={Link}
            to="/troca"
          />
          <Tab
            classes={{ root: classes.labelRoot }}
            label="Empréstimos"
            component={Link}
            to="/emprestimo"
          />
          <Tab
            classes={{ root: classes.labelRoot }}
            label="Doações"
            component={Link}
            to="/doacao"
          />
          <Tab
            classes={{ root: classes.labelRoot }}
            label="Vendas"
            component={Link}
            to="/venda"
          />
        </Tabs>
      </AppBar>
    </div>
  );
}

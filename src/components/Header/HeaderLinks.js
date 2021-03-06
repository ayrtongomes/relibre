/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
// react components for routing our app without refresh
import { NavLink } from 'react-router-dom';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Tooltip from '@material-ui/core/Tooltip';

// @material-ui/icons
import { NotificationsActive, CloudDownload, Person } from '@material-ui/icons';

// core components
import CustomDropdown from 'components/CustomDropdown/CustomDropdown.js';
import Button from 'components/CustomButtons/Button.js';

import styles from 'assets/jss/material-kit-react/components/headerLinksStyle.js';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
import { useAuth } from 'services/auth';

const useStyles = makeStyles(styles);

const getFirstName = (name = '') => {
  const arr = (typeof name === 'string' ? name : '').split(' ') || [''];

  if (arr.length > 0) {
    if (arr instanceof Array) {
      return arr[0];
    } else if (typeof arr === 'string') {
      return arr;
    }
  }

  return '';
};

export default function HeaderLinks(props) {
  const classes = useStyles();
  const { user, logout } = useAuth();

  const width = window.innerWidth;

  return (
    <List className={classes.list}>
      {user && user.token ? (
        <>
          {width < 768 ? (
            <>
              <ListItem className={classes.listItem}>
                <NavLink
                  to="/minha-conta/combinacoes"
                  className={classes.dropdownLink}
                >
                  Combinações
                </NavLink>
              </ListItem>
              <ListItem className={classes.listItem}>
                <NavLink to="/troca" className={classes.dropdownLink}>
                  Trocas
                </NavLink>{' '}
              </ListItem>
              <ListItem className={classes.listItem}>
                <NavLink to="/emprestimo" className={classes.dropdownLink}>
                  Empréstimos
                </NavLink>{' '}
              </ListItem>
              <ListItem className={classes.listItem}>
                <NavLink to="/doacao" className={classes.dropdownLink}>
                  Doações
                </NavLink>{' '}
              </ListItem>
              <ListItem className={classes.listItem}>
                <NavLink to="/venda" className={classes.dropdownLink}>
                  Vendas
                </NavLink>{' '}
              </ListItem>
              <ListItem className={classes.listItem}>
                <NavLink
                  to="/minha-conta/meu-perfil"
                  className={classes.dropdownLink}
                >
                  Meu perfil
                </NavLink>{' '}
              </ListItem>
              <ListItem className={classes.listItem}>
                <a onClick={() => logout()} className={classes.dropdownLink}>
                  Sair
                </a>
              </ListItem>
            </>
          ) : (
            <ListItem className={classes.listItem}>
              <CustomDropdown
                noLiPadding
                buttonText={getFirstName(user.name)}
                buttonProps={{
                  className: classes.navLink,
                  color: 'transparent'
                }}
                buttonIcon={Person}
                dropdownList={[
                  <NavLink
                    to="/minha-conta/combinacoes"
                    className={classes.dropdownLink}
                  >
                    Combinações
                  </NavLink>,
                  <NavLink to="/troca" className={classes.dropdownLink}>
                    Trocas
                  </NavLink>,
                  <NavLink to="/emprestimo" className={classes.dropdownLink}>
                    Empréstimos
                  </NavLink>,
                  <NavLink to="/doacao" className={classes.dropdownLink}>
                    Doações
                  </NavLink>,
                  <NavLink to="/venda" className={classes.dropdownLink}>
                    Vendas
                  </NavLink>,
                  <NavLink
                    to="/minha-conta/meu-perfil"
                    className={classes.dropdownLink}
                  >
                    Meu perfil
                  </NavLink>,
                  <a onClick={() => logout()} className={classes.dropdownLink}>
                    Sair
                  </a>
                ]}
              />
            </ListItem>
          )}
        </>
      ) : (
        <>
          <ListItem className={classes.listItem}>
            <NavLink to="/register">
              <Button
                //href="https://www.creative-tim.com/product/material-kit-react?ref=mkr-navbar"
                color="transparent"
                target="_blank"
                className={classes.navLink}
              >
                Registre-se
              </Button>
            </NavLink>
          </ListItem>
          <ListItem className={classes.listItem}>
            <NavLink to="/login">
              <Button
                color="transparent"
                target="_blank"
                className={classes.navLink}
              >
                <Person className={classes.icons} /> Entrar
              </Button>
            </NavLink>
          </ListItem>
        </>
      )}
    </List>
  );
}

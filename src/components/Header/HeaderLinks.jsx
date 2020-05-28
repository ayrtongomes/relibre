/*eslint-disable*/
import React from 'react';
// react components for routing our app without refresh
import { Link } from 'react-router-dom';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Tooltip from '@material-ui/core/Tooltip';

// @material-ui/icons
import { Person } from '@material-ui/icons';

// core components
import CustomDropdown from 'components/CustomDropdown/CustomDropdown.jsx';
import Button from 'components/CustomButtons/Button.jsx';

import headerLinksStyle from 'assets/jss/material-kit-react/components/headerLinksStyle.jsx';

function HeaderLinks({ ...props }) {
  let user = JSON.parse(localStorage.getItem('user'));

  const { classes } = props;
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        {user && user.login && (
          <CustomDropdown
            noLiPadding
            buttonText={user.login}
            buttonProps={{
              className: classes.navLink,
              color: 'transparent'
            }}
            buttonIcon={Person}
            //dropdownList={[dropList]}
            dropdownList={[
              // <Link to="/register" className={classes.dropdownLink}>
              //   Cadastrar
              // </Link>,
              <Link to="/login" className={classes.dropdownLink}>
                Sair
              </Link>
            ]}
          />
        )}
      </ListItem>
    </List>
  );
}

export default withStyles(headerLinksStyle)(HeaderLinks);

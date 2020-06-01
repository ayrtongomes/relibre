/*eslint-disable*/
import React from 'react';
// nodejs library to set properties for components
import PropTypes from 'prop-types';
// nodejs library that concatenates classes
import classNames from 'classnames';
import { List, ListItem, withStyles } from '@material-ui/core';

// @material-ui/icons
import Favorite from '@material-ui/icons/Favorite';

import footerStyle from 'assets/jss/material-kit-react/components/footerStyle.js';

function Footer({ ...props }) {
  const { classes, whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  const aClasses = classNames({
    [classes.a]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  return (
    <footer className={footerClasses}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a
                href="https://www.github.com/ayrtongomes"
                className={classes.block}
                target="_blank"
              >
                github
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                href="https://www.linkedin.com.br"
                className={classes.block}
                target="_blank"
              >
                Trabalhe conosco
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                href="https://www.creative-tim.com/license"
                className={classes.block}
                target="_blank"
              >
                Licenças
              </a>
            </ListItem>
          </List>
        </div>
        <div className={classes.right}>
          &copy; {1900 + new Date().getYear()} , made with{' '}
          <Favorite className={classes.icon} /> by{' Relibre Team'}
          {/* <Favorite className={classes.icon} /> by{" Ayrton"} with {" "}
          <a
            href="https://github.com/ayrtongomes"
            className={aClasses}
            target="_blank"
          >
            Ayrton Gomes 
          </a>*/}
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
  whiteFont: PropTypes.bool
};

export default withStyles(footerStyle)(Footer);

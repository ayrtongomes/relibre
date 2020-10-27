import React from 'react';
import PropTypes from 'prop-types';
// javascript plugin used to create scrollbars on windows
import { NavLink } from 'react-router-dom';
import cx from 'classnames';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Hidden from '@material-ui/core/Hidden';
import Collapse from '@material-ui/core/Collapse';
import Icon from '@material-ui/core/Icon';

// core components

import sidebarStyle from 'assets/jss/material-kit-react/components/sidebarStyle.js';

class SidebarWrapper extends React.Component {
  render() {
    const { className, headerLinks, links } = this.props;
    return (
      <div className={className} ref="sidebarWrapper">
        {headerLinks}
        {links}
      </div>
    );
  }
}

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openAvatar: false,
      miniActive: true,
      ...this.getCollapseStates(props.routes)
    };
  }
  // this creates the intial state of this component based on the collapse routes
  // that it gets through this.props.routes
  getCollapseStates = routes => {
    let initialState = {};
    routes.map((prop, key) => {
      if (prop.collapse) {
        initialState = {
          [prop.state]: this.getCollapseInitialState(prop.views),
          ...this.getCollapseStates(prop.views),
          ...initialState
        };
      }
      return null;
    });
    return initialState;
  };
  // this verifies if any of the collapses should be default opened on a rerender of this component
  // for example, on the refresh of the page,
  // while on the src/views/forms/RegularForms.jsx - route /admin/regular-forms
  getCollapseInitialState(routes) {
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse && this.getCollapseInitialState(routes[i].views)) {
        return true;
      } else if (window.location.href.indexOf(routes[i].path) !== -1) {
        return true;
      }
    }
    return false;
  }
  // verifies if routeName is the one active (in browser input)
  activeRoute = routeName => {
    return window.location.pathname.indexOf(routeName) > -1 ? 'active' : '';
  };

  openCollapse(collapse) {
    var st = {};
    st[collapse] = !this.state[collapse];
    this.setState(st);
  }
  // this function creates the links and collapses that appear in the sidebar (left menu)
  createLinks = routes => {
    const { t, classes, color, rtlActive } = this.props;
    //
    return routes
      .filter(n => n.sidebar)
      .map((prop, key) => {
        if (prop.redirect) {
          return null;
        }
        if (prop.collapse) {
          var st = {};
          st[prop['state']] = !this.state[prop.state];
          const navLinkClasses =
            classes.itemLink +
            ' ' +
            cx({
              [' ' + classes.collapseActive]: this.getCollapseInitialState(
                prop.views
              )
            });
          const itemText =
            classes.itemText +
            ' ' +
            cx({
              [classes.itemTextMini]:
                this.props.miniActive && this.state.miniActive,
              [classes.itemTextMiniRTL]:
                rtlActive && this.props.miniActive && this.state.miniActive,
              [classes.itemTextRTL]: rtlActive
            });
          const collapseItemText =
            classes.collapseItemText +
            ' ' +
            cx({
              [classes.collapseItemTextMini]:
                this.props.miniActive && this.state.miniActive,
              [classes.collapseItemTextMiniRTL]:
                rtlActive && this.props.miniActive && this.state.miniActive,
              [classes.collapseItemTextRTL]: rtlActive
            });
          const itemIcon =
            classes.itemIcon +
            ' ' +
            cx({
              [classes.itemIconRTL]: rtlActive
            });
          const caret =
            classes.caret +
            ' ' +
            cx({
              [classes.caretRTL]: rtlActive
            });
          const collapseItemMini =
            classes.collapseItemMini +
            ' ' +
            cx({
              [classes.collapseItemMiniRTL]: rtlActive
            });
          return (
            <ListItem
              key={key}
              className={cx(
                { [classes.item]: prop.icon !== undefined },
                { [classes.collapseItem]: prop.icon === undefined }
              )}
            >
              <NavLink
                to={'#'}
                className={navLinkClasses}
                onClick={e => {
                  e.preventDefault();
                  this.setState(st);
                }}
              >
                {prop.icon !== undefined ? (
                  typeof prop.icon === 'string' ? (
                    <Icon className={itemIcon}>{prop.icon}</Icon>
                  ) : (
                    <prop.icon className={itemIcon} />
                  )
                ) : (
                  <span className={collapseItemMini}>{prop.mini}</span>
                )}
                <ListItemText
                  primary={rtlActive ? prop.rtlName : prop.name}
                  secondary={
                    <b
                      className={
                        caret +
                        ' ' +
                        (this.state[prop.state] ? classes.caretActive : '')
                      }
                    />
                  }
                  disableTypography={true}
                  className={cx(
                    { [itemText]: prop.icon !== undefined },
                    { [collapseItemText]: prop.icon === undefined }
                  )}
                />
              </NavLink>
              <Collapse in={this.state[prop.state]} unmountOnExit>
                <List className={classes.list + ' ' + classes.collapseList}>
                  {this.createLinks(prop.views)}
                </List>
              </Collapse>
            </ListItem>
          );
        }
        const innerNavLinkClasses = classes.collapseItemLink;
        //+
        //' ' +
        // cx({
        //   [' ' + classes['blue']]: this.activeRoute(prop.path)
        // });
        const collapseItemMini =
          classes.collapseItemMini +
          ' ' +
          cx({
            [classes.collapseItemMiniRTL]: rtlActive
          });
        const navLinkClasses = classes.itemLink;
        //+
        //' ' +
        // cx({
        //   [' ' + classes['blue']]: this.activeRoute(prop.path)
        // });
        const itemText =
          classes.itemText +
          ' ' +
          cx({
            [classes.itemTextMini]:
              this.props.miniActive && this.state.miniActive,
            [classes.itemTextMiniRTL]:
              rtlActive && this.props.miniActive && this.state.miniActive,
            [classes.itemTextRTL]: rtlActive
          });
        const collapseItemText =
          classes.collapseItemText +
          ' ' +
          cx({
            [classes.collapseItemTextMini]:
              this.props.miniActive && this.state.miniActive,
            [classes.collapseItemTextMiniRTL]:
              rtlActive && this.props.miniActive && this.state.miniActive,
            [classes.collapseItemTextRTL]: rtlActive
          });
        const itemIcon =
          classes.itemIcon +
          ' ' +
          cx({
            [classes.itemIconRTL]: rtlActive
          });
        return (
          <ListItem
            key={key}
            className={cx(
              { [classes.item]: prop.icon !== undefined },
              { [classes.collapseItem]: prop.icon === undefined }
            )}
          >
            <NavLink
              to={prop.layout + prop.path}
              className={cx(
                { [navLinkClasses]: prop.icon !== undefined },
                { [innerNavLinkClasses]: prop.icon === undefined }
              )}
            >
              {prop.icon !== undefined ? (
                typeof prop.icon === 'string' ? (
                  prop.iconSmall !== undefined && prop.iconSmall ? (
                    <Icon className={classes.iconSmall}>{prop.icon}</Icon>
                  ) : (
                    <Icon className={itemIcon}>{prop.icon}</Icon>
                  )
                ) : (
                  <prop.icon className={itemIcon} />
                )
              ) : (
                <span className={collapseItemMini}>{prop.mini}</span>
              )}
              <ListItemText
                primary={prop.name}
                disableTypography={true}
                className={cx(
                  { [itemText]: prop.icon !== undefined },
                  { [collapseItemText]: prop.icon === undefined }
                )}
              />
            </NavLink>
          </ListItem>
        );
      });
  };
  render() {
    const { classes, logo, image, routes, bgColor, rtlActive } = this.props;

    const itemText =
      classes.itemText +
      ' ' +
      cx({
        [classes.itemTextMini]: this.props.miniActive && this.state.miniActive,
        [classes.itemTextMiniRTL]:
          rtlActive && this.props.miniActive && this.state.miniActive,
        [classes.itemTextRTL]: rtlActive
      });
    const caret =
      classes.caret +
      ' ' +
      cx({
        [classes.caretRTL]: rtlActive
      });
    const collapseItemMini =
      classes.collapseItemMini +
      ' ' +
      cx({
        [classes.collapseItemMiniRTL]: rtlActive
      });
    const photo =
      classes.photo +
      ' ' +
      cx({
        [classes.photoRTL]: rtlActive
      });
    var links = (
      <List className={classes.list}>{this.createLinks(routes)}</List>
    );

    const logoClasses =
      classes.logo +
      ' ' +
      cx({
        [classes.whiteAfter]: bgColor === 'white'
      });
    const drawerPaper =
      classes.drawerPaper +
      ' ' +
      cx({
        [classes.drawerPaperMini]:
          this.props.miniActive && this.state.miniActive,
        [classes.drawerPaperRTL]: rtlActive
      });
    const sidebarWrapper =
      classes.sidebarWrapper +
      ' ' +
      cx({
        [classes.drawerPaperMini]:
          this.props.miniActive && this.state.miniActive,
        [classes.sidebarWrapperWithPerfectScrollbar]:
          navigator.platform.indexOf('Win') > -1
      });
    return (
      <div ref="mainPanel">
        <Hidden mdUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={'right'}
            open={this.props.open}
            classes={{
              paper: drawerPaper + ' ' + classes[bgColor + 'Background']
            }}
            onClose={this.props.handleDrawerToggle}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            <SidebarWrapper className={sidebarWrapper} links={links} />
            {image !== undefined ? (
              <div
                className={classes.background}
                style={{ backgroundImage: 'url(' + image + ')' }}
              />
            ) : null}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            onMouseEnter={() => this.setState({ miniActive: false })}
            onMouseLeave={() => this.setState({ miniActive: true })}
            anchor={'left'}
            variant="permanent"
            open
            classes={{
              paper: drawerPaper + ' ' + classes[bgColor + 'Background']
            }}
          >
            <SidebarWrapper className={sidebarWrapper} links={links} />
            {image !== undefined ? (
              <div
                className={classes.background}
                style={{ backgroundImage: 'url(' + image + ')' }}
              />
            ) : null}
          </Drawer>
        </Hidden>
      </div>
    );
  }
}

Sidebar.defaultProps = {
  bgColor: 'blue'
};

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  bgColor: PropTypes.oneOf(['white', 'black', 'blue']),
  rtlActive: PropTypes.bool,
  color: PropTypes.oneOf([
    'white',
    'red',
    'orange',
    'green',
    'blue',
    'purple',
    'rose'
  ]),
  logo: PropTypes.string,
  image: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object)
};

export default withStyles(sidebarStyle)(Sidebar);

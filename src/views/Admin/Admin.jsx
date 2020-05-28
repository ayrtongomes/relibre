import React from 'react';
import { connect } from 'react-redux';

import cx from 'classnames';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Footer from 'components/Footer/Footer.jsx';

import Header from 'components/Header/Header.jsx';
import HeaderLinks from 'components/Header/HeaderLinks.jsx';

import { dashRoutes } from './routes.js';

// Utils
import compose from 'utils/compose';

import appStyle from 'assets/jss/material-kit-react/layouts/adminStyle.jsx';

var ps;

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
      miniActive: false,
      color: 'green',
      bgColor: 'black',
      hasImage: true,
      fixedClasses: 'dropdown'
    };
    this.resizeFunction = this.resizeFunction.bind(this);
  }

  componentDidMount() {
    // if (navigator.platform.indexOf("Win") > -1) {
    // 	ps = new PerfectScrollbar(this.refs.mainPanel, {
    // 		suppressScrollX: true,
    // 		suppressScrollY: false
    // 	});
    // 	document.body.style.overflow = "hidden";
    // }
    window.addEventListener('resize', this.resizeFunction);
  }
  componentWillUnmount() {
    // if (navigator.platform.indexOf("Win") > -1) {
    // 	ps.destroy();
    // }
    window.removeEventListener('resize', this.resizeFunction);
  }
  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.refs.mainPanel.scrollTop = 0;
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }
  handleImageClick = image => {
    this.setState({ image: image });
  };
  handleColorClick = color => {
    this.setState({ color: color });
  };
  handleBgColorClick = bgColor => {
    this.setState({ bgColor: bgColor });
  };
  handleFixedClick = () => {
    if (this.state.fixedClasses === 'dropdown') {
      this.setState({ fixedClasses: 'dropdown show' });
    } else {
      this.setState({ fixedClasses: 'dropdown' });
    }
  };
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  getRoute() {
    return this.props.location.pathname !== '/admin/full-screen-maps';
  }
  // getActiveRoute = dashRoutes => {
  // 	const {t} = this.props;

  // 	let activeRoute = "";
  // 	for (let i = 0; i < dashRoutes.length; i++) {
  // 		if (dashRoutes[i].collapse) {
  // 			let collapseActiveRoute = this.getActiveRoute(dashRoutes[i].views);
  // 			if (collapseActiveRoute !== activeRoute) {
  // 				return collapseActiveRoute;
  // 			}
  // 		} else {
  // 			var path = dashRoutes[i].path.replace(':id','');
  // 			if (
  // 				window.location.href.indexOf(dashRoutes[i].layout + path) !== -1
  // 			) {
  // 				return t(dashRoutes[i].name);
  // 			}
  // 		}
  // 	}
  // 	return activeRoute;
  // };
  getRoutes = dashRoutes => {
    return dashRoutes.map((prop, key) => {
      if (prop.layout === '/client') {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  resizeFunction() {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  }

  render() {
    const { classes, ...rest } = this.props;
    const mainPanel = classes.mainPanel;

    // var dropList =
    // 	(<Link to="/" className={classes.dropdownLink}>
    // 	Cadastrar
    // 	</Link>,
    // 	<Link to="/login" className={classes.dropdownLink}>
    // 	Entrar
    // 	</Link>)
    return (
      <div className={classes.wrapper}>
        {/* {alert}
			{loading} */}
        <div className={mainPanel} ref="mainPanel">
          {/* On the /maps/full-screen-maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
          {this.getRoute() ? (
            <div className={classes.content}>
              <div className={classes.container}>
                <Switch>{this.getRoutes(dashRoutes)}</Switch>
              </div>
            </div>
          ) : (
            <div className={classes.map}>
              <Switch>{this.getRoutes(dashRoutes)}</Switch>
            </div>
          )}
          {this.getRoute() ? <Footer fluid /> : null}
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired
};

// function mapStateToProps(state) {
// 	const { users, authentication, sweetAlert, loader} = state;
// 	const { user } = authentication;
// 	return {
// 		user,
// 		users,
// 		alert: sweetAlert.alert,
// 		loading: loader.loading
// 	};
// }

export default compose(
  //connect(mapStateToProps),
  withStyles(appStyle)
)(Main);

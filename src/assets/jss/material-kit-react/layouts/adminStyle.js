import {
  //drawerWidth,
  //drawerMiniWidth,
  transition
  //containerFluid
} from 'assets/jss/material-kit-react.js';

const appStyle = theme => ({
  wrapper: {
    position: 'relative',
    top: '0',
    height: '100vh',
    '&:after': {
      display: 'table',
      clear: 'both',
      content: '" "'
    }
  },
  mainPanel: {
    transitionProperty: 'top, bottom, width',
    transitionDuration: '.2s, .2s, .35s',
    transitionTimingFunction: 'linear, linear, ease',
    overflow: 'auto',
    position: 'relative',
    float: 'right',
    ...transition,
    maxHeight: '100%',
    width: '100%',
    overflowScrolling: 'touch'
  },
  content: {
    marginTop: '60px',
    marginLeft: '260px',
    minHeight: 'calc(100vh - 123px)',
    [theme.breakpoints.down('sm')]: {
      padding: '0px 0px 0 15px !important'
    }
  },
  //container: { ...containerFluid },
  map: {
    marginTop: '70px'
  }
});

export default appStyle;

import { container } from 'assets/jss/material-kit-react.js';
import {
  primaryColor,
  grayColor,
  roseColor
} from 'assets/jss/material-kit-react.js';

const signupPageStyle = {
  container: {
    ...container,
    zIndex: '2',
    position: 'relative',
    paddingTop: '10vh',
    color: '#FFFFFF'
  },
  cardHidden: {
    opacity: '0',
    transform: 'translate3d(0, -60px, 0)'
  },
  pageHeader: {
    minHeight: '100vh',
    height: 'auto',
    display: 'inherit',
    position: 'relative',
    margin: '0',
    padding: '0',
    border: '0',
    alignItems: 'center',
    '&:before': {
      background: 'rgba(0, 0, 0, 0.5)'
    },
    '&:before,&:after': {
      position: 'absolute',
      zIndex: '1',
      width: '100%',
      height: '100%',
      display: 'block',
      left: '0',
      top: '0',
      content: '""'
    },
    '& footer li a,& footer li a:hover,& footer li a:active': {
      color: '#FFFFFF'
    },
    '& footer': {
      position: 'absolute',
      bottom: '0',
      width: '100%'
    }
  },
  form: {
    margin: '0'
  },
  cardHeader: {
    width: 'auto',
    textAlign: 'center',
    marginLeft: '20px',
    marginRight: '20px',
    marginTop: '-40px',
    padding: '20px 0',
    marginBottom: '15px'
  },
  socialIcons: {
    maxWidth: '24px',
    marginTop: '0',
    width: '100%',
    transform: 'none',
    left: '0',
    top: '0',
    height: '100%',
    lineHeight: '41px',
    fontSize: '20px'
  },
  divider: {
    marginTop: '30px',
    marginBottom: '0px',
    textAlign: 'center'
  },
  cardFooter: {
    paddingTop: '0rem',
    border: '0',
    borderRadius: '6px',
    justifyContent: 'center !important'
  },
  socialLine: {
    marginTop: '1rem',
    textAlign: 'center',
    padding: '0'
  },
  inputIconsColor: {
    color: '#495057'
  },
  checkRoot: {
    padding: '14px'
  },
  checked: {
    color: primaryColor + '!important'
  },
  checkedIcon: {
    width: '20px',
    height: '20px',
    border: '1px solid rgba(41,41,41, .54)',
    borderRadius: '3px'
  },
  uncheckedIcon: {
    width: '0px',
    height: '0px',
    padding: '9px',
    border: '1px solid rgba(41,41,41, .54)',
    borderRadius: '3px'
  },
  iconCheckbox: {
    height: '116px',
    width: '116px',
    color: primaryColor[0],
    padding: '0',
    margin: '0 auto 20px',
    '& > span:first-child': {
      borderWidth: '4px',
      borderStyle: 'solid',
      borderColor: grayColor,
      textAlign: 'center',
      verticalAlign: 'middle',
      borderRadius: '50%',
      color: 'inherit',
      transition: 'all 0.2s'
    },
    '&:hover': {
      color: primaryColor[0],
      '& > span:first-child': {
        borderColor: primaryColor
      }
    }
  },
  iconCheckboxChecked: {
    color: primaryColor[0],
    '& > span:first-child': {
      borderColor: primaryColor
    }
  },
  iconCheckboxIcon: {
    fontSize: '40px',
    lineHeight: '111px'
  }
};

export default signupPageStyle;

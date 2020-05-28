import {
  primaryColor,
  warningColor,
  dangerColor,
  successColor,
  infoColor,
  roseColor,
  grayColor,
  title
} from 'assets/jss/material-kit-react.jsx';

const infoStyle = {
  infoArea: {
    maxWidth: 'auto',
    margin: '0 auto',
    padding: '0px',
    display: 'inline-grid'
  },
  iconWrapper: {
    marginTop: '24px',
    marginRight: '10px'
  },
  primary: {
    color: primaryColor
  },
  warning: {
    color: warningColor
  },
  danger: {
    color: dangerColor
  },
  success: {
    color: successColor
  },
  info: {
    color: infoColor
  },
  rose: {
    color: roseColor
  },
  gray: {
    color: grayColor
  },
  icon: {
    width: '36px',
    height: '36px'
  },
  descriptionWrapper: {
    color: grayColor,
    overflow: 'hidden'
  },
  title,
  description: {
    color: grayColor,
    overflow: 'hidden',
    marginTop: '0px',
    fontSize: '14px',
    textAlign: 'left'
  },
  iconWrapperVertical: {
    float: 'none'
  },
  iconVertical: {
    width: '61px',
    height: '61px'
  }
};

export default infoStyle;

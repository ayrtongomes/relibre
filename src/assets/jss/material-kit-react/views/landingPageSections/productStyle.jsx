import { title } from 'assets/jss/material-kit-react.js';

const productStyle = {
  section: {
    padding: '70px 0',
    textAlign: 'center'
  },
  title: {
    ...title,
    marginBottom: '1rem',
    marginTop: '30px',
    minHeight: '32px',
    textDecoration: 'none'
  },
  description: {
    color: '#999'
  },
  resultBoxContent: {
    cursor: 'pointer',
    '&::after': {
      content: "''",
      borderBottom: 'solid 1px #3C4858',
      position: 'absolute',
      width: '100%'
    }
  }
};

export default productStyle;

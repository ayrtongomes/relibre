import React, { Fragment } from 'react';
import { withRouter, Route, NavLink } from 'react-router-dom';

// nodejs library that concatenates classes
import classNames from 'classnames';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';

// @material-ui/icons

// core components
import Header from 'components/Header/Header.jsx';
import Footer from 'components/Footer/Footer.jsx';
import HeaderLinks from 'components/Header/HeaderLinks.jsx';
import Parallax from 'components/Parallax/Parallax.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import landingPageStyle from 'assets/jss/material-kit-react/views/landingPage.jsx';
import Star from '@material-ui/icons/Star';
import VerifiedUser from '@material-ui/icons/VerifiedUser';
import Fingerprint from '@material-ui/icons/Fingerprint';
// core components
import InfoArea from 'components/InfoArea/InfoArea.jsx';
// @material core
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';

// @material - icons
import SearchIcon from '@material-ui/icons/Search';

// css
import styles from './styles.module.scss';

import { GetInstituicoesData } from '../../redux/actions';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import compose from 'utils/compose';

// Sections for this page
import ResultSection from './Sections/ResultSection.jsx';

class ResultPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchName: '',
      results: []
    };
  }

  componentDidMount() {
    this.props.GetInstituicoesData(this.state.searchName);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.instituicaoData !== this.props.instituicaoData) {
      this.setState({ results: this.props.instituicaoData });
      console.log(this.props.instituicaoData);
    }
  }

  change(event, type) {
    switch (type) {
      case 'searchName':
        this.setState({ searchName: event.target.value });
        break;

      default:
        break;
    }
  }
  submit = e => {
    e.preventDefault();
    this.setState({ submitted: true });
    const { searchName } = this.state;
    //const { dispatch } = this.props;
    if (searchName) {
      this.props.GetInstituicoesData(searchName);
    }
  };

  render() {
    const { classes, ...rest } = this.props;
    const { results } = this.state;
    return (
      <div>
        <Header
          brand="relibre"
          rightLinks={<HeaderLinks />}
          fixed
          color="dark"
          changeColorOnScroll={{
            height: 400,
            color: 'white'
          }}
          {...rest}
        />
        <Parallax
          filter
          image={require('assets/img/bg4.jpg')}
          style={{ height: '300px' }}
          className={styles.header}
        >
          <div className={classes.container}>
            <GridContainer>
              <GridItem>
                <div className={classes.brand}>
                  <Paper className={styles.searchBox}>
                    <InputBase
                      type="search"
                      className={styles.input}
                      placeholder=" Buscar instituição"
                      inputProps={{
                        'aria-label': ' Buscar instituição',
                        type: 'text',
                        onChange: event => this.change(event, 'searchName')
                      }}
                    />
                    <Button
                      color="primary"
                      type="submit"
                      onClick={this.submit}
                      className={styles.iconButton}
                      aria-label="Search"
                    >
                      <SearchIcon />
                    </Button>
                  </Paper>
                </div>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <GridContainer>
              {/* {results > 0 &&
                                <Fragment> */}
              {results.map(item => (
                <NavLink to="/client/instituicao/page">
                  <GridItem
                    xs={12}
                    sm={12}
                    md={12}
                    className={classes.resultBoxContent}
                  >
                    <InfoArea
                      title={item.nome}
                      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque quam, egestas ut nibh a, venenatis egestas velit. Nam aliquet a nisi in tempus. Proin mattis mauris sit amet diam porttitor ornare. Nulla molestie egestas diam. Etiam fringilla, mauris vel dapibus lobortis, nunc lectus suscipit sem, sed iaculis est sapien sit amet diam."
                      icon={Star}
                      iconColor="warning"
                      rank={item.rank}
                    />
                    <h5 style={{ color: '#3C4858', fontWeight: '500' }}>
                      {item.cidade} - {item.estado}
                    </h5>
                  </GridItem>
                </NavLink>
              ))}
              {/* </Fragment>
                            } */}
            </GridContainer>
            {/* <ResultSection results={results}></ResultSection> */}
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    instituicaoData: state.instituicao.instituicaoData,
    instituicaoDataDataFailed: state.instituicao.instituicaoDataFailed
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ GetInstituicoesData }, dispatch);

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(landingPageStyle)
)(ResultPage);

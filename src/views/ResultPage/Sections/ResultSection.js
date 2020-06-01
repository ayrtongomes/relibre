import React from 'react';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';

// @material-ui/icons
import Star from '@material-ui/icons/Star';
// core components
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import InfoArea from 'components/InfoArea/InfoArea.js';

import productStyle from 'assets/jss/material-kit-react/views/landingPageSections/productStyle.js';

class ResultSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: []
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.results !== this.props.results) {
      this.setState({ results: this.props.results });
    }
  }
  render() {
    const { classes, results } = this.props;
    // const { results } = this.state;
    return (
      <div>
        {console.log('results', results)}
        <div>
          <GridContainer>
            {/* { results >  0 &&
            <Fragment>
              {results.map(item => (
                <GridItem xs={12} sm={12} md={12} className={classes.resultBoxContent}>
                  <InfoArea
                    title={item.nome}
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque quam, egestas ut nibh a, venenatis egestas velit. Nam aliquet a nisi in tempus. Proin mattis mauris sit amet diam porttitor ornare. Nulla molestie egestas diam. Etiam fringilla, mauris vel dapibus lobortis, nunc lectus suscipit sem, sed iaculis est sapien sit amet diam."
                    icon={Star}
                    iconColor="warning"
                    rank={item.rank}
                  />
                  <h5 style={{ color: "#3C4858", fontWeight: '500' }}>{item.cidade} - {item.estado}</h5>
                </GridItem>
              ))}
              </Fragment>
            } */}
            <GridItem
              xs={12}
              sm={12}
              md={12}
              className={classes.resultBoxContent}
            >
              <InfoArea
                title="Universidade Positivo"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque quam, egestas ut nibh a, venenatis egestas velit. Nam aliquet a nisi in tempus. Proin mattis mauris sit amet diam porttitor ornare. Nulla molestie egestas diam. Etiam fringilla, mauris vel dapibus lobortis, nunc lectus suscipit sem, sed iaculis est sapien sit amet diam."
                icon={Star}
                iconColor="warning"
                rank="4,8"
              />
              <h5 style={{ color: '#3C4858', fontWeight: '500' }}>
                CURITIBA - PR
              </h5>
            </GridItem>
            <GridItem
              xs={12}
              sm={12}
              md={12}
              className={classes.resultBoxContent}
            >
              <InfoArea
                title="Pontifícia Universidade Católica"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque quam, egestas ut nibh a, venenatis egestas velit. Nam aliquet a nisi in tempus. Proin mattis mauris sit amet diam porttitor ornare. Nulla molestie egestas diam. Etiam fringilla, mauris vel dapibus lobortis, nunc lectus suscipit sem, sed iaculis est sapien sit amet diam."
                icon={Star}
                iconColor="warning"
                rank="4,7"
              />
              <h5 style={{ color: '#3C4858', fontWeight: '500' }}>
                CURITIBA - PR
              </h5>
            </GridItem>
            <GridItem
              xs={12}
              sm={12}
              md={12}
              className={classes.resultBoxContent}
            >
              <InfoArea
                title="Universidade Positivo"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque quam, egestas ut nibh a, venenatis egestas velit. Nam aliquet a nisi in tempus. Proin mattis mauris sit amet diam porttitor ornare. Nulla molestie egestas diam. Etiam fringilla, mauris vel dapibus lobortis, nunc lectus suscipit sem, sed iaculis est sapien sit amet diam."
                icon={Star}
                iconColor="warning"
              />
              <h5 style={{ color: '#3C4858', fontWeight: '500' }}>
                CURITIBA - PR
              </h5>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(productStyle)(ResultSection);

import React from 'react';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';

// @material-ui/icons
import Star from '@material-ui/icons/Star';
import VerifiedUser from '@material-ui/icons/VerifiedUser';
import Fingerprint from '@material-ui/icons/Fingerprint';
// core components
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import InfoArea from 'components/InfoArea/InfoArea.js';

import productStyle from 'assets/jss/material-kit-react/views/landingPageSections/productStyle.js';

class ProductSection extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <div>
          <GridContainer>
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

export default withStyles(productStyle)(ProductSection);

import React from 'react';
// core components
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Table from 'components/ContactList/ContactTable';

const Mine = ({ data, reloadData, ...props }) => {
  return (
    <GridContainer justify="center">
      <GridItem xs={12} sm={12} md={12}>
        <Table data={data} reloadData={reloadData} />
      </GridItem>
    </GridContainer>
  );
};

export default Mine;

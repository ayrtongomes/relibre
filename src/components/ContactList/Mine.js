import React, { useState, useEffect } from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// @material-ui/core components
import makeStyles from '@material-ui/core/styles/makeStyles';
// @material-ui/icons
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
// core components
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Parallax from 'components/Parallax/Parallax.js';
import Table from 'components/ContactList/ContactTable';
import Button from 'components/CustomButtons/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Email, Check, Phone, Book } from '@material-ui/icons';

function createData(title, author, type, date) {
  return { title, author, type, date };
}

const rows = [
  createData(
    'Harry Potter e a Pedra Filosofal',
    'Rodrigo Casagrande',
    '4,5',
    '30/06/2020'
  ),
  createData('Watchmen', 'Luis Augusto', '5', '30/06/2020'),
  createData('O Hobbit', 'Clebio Cleber', '4,9', '30/06/2020'),
  createData(
    'Harry Potter e o Enigma do Príncipe',
    'Draco Weasley',
    '4,8',
    '30/06/2020'
  )
];

const Mine = ({ data, ...props }) => {
  console.log('mine:', data);

  return (
    <GridContainer justify="center">
      <GridItem xs={12} sm={12} md={12}>
        <Table data={data} />
      </GridItem>
    </GridContainer>
  );
};

export default Mine;

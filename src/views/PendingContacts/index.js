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
import NavPills from 'components/NavPills/NavPills.js';
import ToApprove from 'components/ContactList/ToApprove.js';
import Mine from 'components/ContactList/Mine.js';

import { useContacts } from 'services/contexts/contact.js';
import { format } from 'date-fns';

import profilePageStyle from 'assets/jss/material-kit-react/views/profilePage.js';

const useStyles = makeStyles(theme => ({
  ...profilePageStyle,
  gridList: {
    display: 'grid',
    margin: '0 auto',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1rem'
  },
  container: {
    maxWidth: 'auto',
    margin: '2rem auto',
    padding: '0 3rem 2rem'
  },
  toolbar: {
    height: '111px',
    width: '100%'
  }
}));

export default props => {
  const { fetchContacts } = useContacts();

  const [toApprove, setToApprove] = useState([]);
  const [mine, setMine] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function loadData() {
      const { data: toApData } = await fetchContacts('Received', 'false');
      const { data: mineData } = await fetchContacts('Send', 'false');
      if (toApData) {
        const formatted = toApData.map(b => {
          return {
            idContact: b.id_contact,
            book: {
              id: b.id_book,
              price: b.price,
              ...b.book
            },
            contactInfo: {
              name: b.full_name,
              email: b.email,
              phone: b.phone,
              rating: b.rating,
              distance: b.distance
            },
            date: format(new Date(b.created_at), 'dd/MM/yyyy')
          };
        });
        setToApprove(formatted);
      }
      if (mineData) {
        const formatted = mineData.map(b => {
          return {
            idContact: b.id_contact,
            book: {
              id: b.id_book,
              price: b.price,
              ...b.book
            },
            contactInfo: {
              name: b.full_name,
              email: b.email,
              phone: b.phone,
              rating: b.rating,
              distance: b.distance
            },
            date: format(new Date(b.created_at), 'dd/MM/yyyy')
          };
        });
        setMine(formatted);
      }
      setIsLoading(false);
    }

    loadData();
  }, [count]);

  const reloadData = () => {
    setCount(count + 1);
  };
  const classes = useStyles();

  return (
    <div>
      <Parallax small filter image={require('assets/img/banner-home.png')} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={12}>
                <div style={{ textAlign: 'left' }} className={classes.profile}>
                  <div className={classes.name} style={{ marginTop: '0' }}>
                    <h2 className={classes.title}>Contatos Pendentes</h2>
                    <div style={{ fontWeight: '300' }}>
                      <span>
                        Veja quem solicitou seus dados de contato e também de
                        quem você solicitou.
                      </span>
                    </div>
                  </div>
                </div>
              </GridItem>
              <Divider style={{ margin: '2rem 0', width: '100%' }} />
            </GridContainer>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={12} className={classes.navWrapper}>
                <NavPills
                  alignCenter
                  color="primary"
                  tabs={[
                    {
                      tabButton: 'Para aprovação',
                      tabContent: (
                        <ToApprove
                          data={toApprove}
                          reloadData={() => reloadData()}
                        />
                      )
                    },
                    {
                      tabButton: 'Solicitados',
                      tabContent: (
                        <Mine data={mine} reloadData={() => reloadData()} />
                      )
                    }
                  ]}
                />
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

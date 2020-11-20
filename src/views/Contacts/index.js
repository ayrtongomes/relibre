import React, { useState, useEffect } from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// @material-ui/core components
import makeStyles from '@material-ui/core/styles/makeStyles';
// @material-ui/icons
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
// core components
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Parallax from 'components/Parallax/Parallax.js';
import CardContact from 'components/Card/CardContact.js';

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
  const [received, setReceived] = useState([]);
  const [requested, setResquested] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function loadData() {
      const { data: receivedData } = await fetchContacts('Received', 'true');
      const { data: sentData } = await fetchContacts('Send', 'true');
      if (receivedData) {
        const formatted = receivedData.map(b => {
          return {
            idContact: b.id_contact,
            param: 'Received',
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
        setReceived(formatted);
      }

      if (sentData) {
        const formatted = sentData.map(b => {
          return {
            idContact: b.id_contact,
            type: 'Send',
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
        setResquested(formatted);
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
                    <h2 className={classes.title}>Contatos Aprovados</h2>
                    <div style={{ fontWeight: '300' }}>
                      <span>
                        Pronto! Agora é só entrar em contato com esses usuários
                        para combinarem os próximos passos da troca, empréstimo
                        ou doação!
                      </span>
                    </div>
                  </div>
                </div>
              </GridItem>
              <Divider style={{ margin: '2rem 0', width: '100%' }} />
            </GridContainer>
            {isLoading ? (
              <div style={{ textAlign: 'center', marginTop: '60px' }}>
                <CircularProgress />
              </div>
            ) : (
              <>
                <h4 className={classes.title} style={{ margin: 0 }}>
                  Solicitados
                </h4>
                {requested && requested.length > 0 ? (
                  <GridContainer justify="start">
                    {requested.map((contact, idx) => {
                      return (
                        <GridItem xs={12} sm={12} md={6} key={idx}>
                          <CardContact
                            data={contact}
                            reloadData={() => reloadData()}
                          />
                        </GridItem>
                      );
                    })}
                  </GridContainer>
                ) : (
                  <div>
                    <span
                      style={{
                        fontSize: '12px',
                        color: '#ccc',
                        fontWeight: 300
                      }}
                    >
                      Nenhum contato solicitado aprovado
                    </span>
                  </div>
                )}

                <Divider style={{ margin: '0 0 1rem', width: '100%' }} />

                <h4 className={classes.title} style={{ margin: 0 }}>
                  Recebidos
                </h4>

                {received && received.length > 0 ? (
                  <GridContainer justify="start">
                    {received.map((contact, idx) => {
                      return (
                        <GridItem xs={12} sm={12} md={6} key={idx}>
                          <CardContact
                            data={contact}
                            reloadData={() => reloadData()}
                          />
                        </GridItem>
                      );
                    })}
                  </GridContainer>
                ) : (
                  <div>
                    <span
                      style={{
                        fontSize: '12px',
                        color: '#ccc',
                        fontWeight: 300
                      }}
                    >
                      Nenhum contato recebido aprovado
                    </span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

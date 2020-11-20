import React from 'react';
import { useAlert } from 'react-alert';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardFooter from 'components/Card/CardFooter.js';
import Button from 'components/CustomButtons/Button';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import { useHistory } from 'react-router-dom';
import Rating from '@material-ui/lab/Rating';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { useContacts } from 'services/contexts/contact.js';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: 260,
    fontSize: '"Inter", "Roboto", sans-serif'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '"Inter", "Roboto", sans-serif'
  },
  content: {
    flex: '1 0 auto',
    textAlign: 'left'
  },
  cover: {
    width: '70%'
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  playIcon: {
    height: 38,
    width: 38
  },
  flex: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  buttons: {
    display: 'flex',
    flexDirection: 'column'
  },
  hint: {
    fontWeight: 400,
    color: '#414141'
  },
  rating: {
    '& label': {
      fontSize: '52px !important'
    }
  }
}));

export default function CardContact({ data, reloadData }) {
  const classes = useStyles();
  const alert = useAlert();
  const history = useHistory();
  const { rateUser } = useContacts();

  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);

  const handleRate = async () => {
    const payload = {
      note: value,
      email: data.contactInfo.email,
      id_contact: data.idContact,
      id_book: data.book.id,
      param: data.type
    };

    try {
      const data = await rateUser(payload);
      if (data) {
        console.log(data);
        // await fetchBooks();
        alert.success('Avaliação feita com sucesso');
        // reloadData();
      }
    } catch (err) {
      alert.error('Não foi possível efetuar a avaliação');

      //Handler error
    } finally {
      setOpen(false);
    }
    console.log(payload);
  };

  return (
    <Card plain>
      <CardBody>
        <div className={classes.flex}>
          <h4>{data.book.title}</h4>
        </div>
        <div className={classes.flex}>
          <div style={{ width: '100%' }}>
            <div>
              <b>Usuário: </b>
              <span className={classes.hint}>{data.contactInfo.name}</span>
            </div>
            <div>
              <b>Avaliação do usuário: </b>{' '}
              <span className={classes.hint}>
                {data.contactInfo.rating < 1
                  ? 'Não avaliado'
                  : data.contactInfo.rating < 1}
              </span>
            </div>
            <div>
              <b>Data de solicitação: </b>{' '}
              <span className={classes.hint}>{data.date}</span>
            </div>
            {/* <div>
              <b>Interesse em: </b> <span className={classes.hint}>Troca</span>
            </div> */}
          </div>
          <div className={classes.buttons}>
            <Button color="outlined" onClick={() => setOpen(true)}>
              Avaliar
            </Button>
            <Button
              color="primary"
              onClick={() => {
                setShowModal(true);
              }}
            >
              Ver dados
            </Button>
          </div>
        </div>
      </CardBody>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {'Como foi a experiência com esse usuário?'}
        </DialogTitle>
        <DialogContent>
          <GridContainer justify="center">
            <GridItem md={12}>
              <Rating
                className={classes.rating}
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
            </GridItem>
          </GridContainer>
          {/* <DialogContentText id="alert-dialog-slide-description">
            Ao clicar em confirmar o usuário receberá sua solicitação e assim
            que for aprovada você poderá ter acesso aos dados de contato desse
            usuário.
          </DialogContentText> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="danger">
            Cancelar
          </Button>
          <Button onClick={() => handleRate()} color="primary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={showModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setShowModal(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="form-dialog-title">Dados de Contato</DialogTitle>
        <DialogContent style={{ textAlign: 'left', minWidth: '420px' }}>
          <div style={{ fontSize: '14px' }}>
            <h4 style={{ textAlign: 'left' }}>Informações de contato</h4>
            <div>
              <b>Nome:</b>{' '}
              <span style={{ fontWeight: 300 }}>{data.contactInfo.name}</span>
            </div>
            <div>
              <b>Email:</b>{' '}
              <span style={{ fontWeight: 300 }}>{data.contactInfo.email}</span>
            </div>
            <div>
              <b>Telefone:</b>{' '}
              <span style={{ fontWeight: 300 }}>{data.contactInfo.phone}</span>
            </div>
            <div>
              <b>Solicitou em:</b>{' '}
              <span style={{ fontWeight: 300 }}>{data.date}</span>
            </div>
            <h4 style={{ textAlign: 'left' }}>Informações do livro</h4>
            <div>
              <b>Título:</b>{' '}
              <span style={{ fontWeight: 300 }}>{data.book.title}</span>
            </div>
            {data.book.authors && data.book.authors.length > 0 ? (
              <div>
                <b>Autor:</b>{' '}
                <span style={{ fontWeight: 300 }}>
                  {data.book.authors[0].name}
                </span>
              </div>
            ) : null}
            <div>
              <b>Descrição:</b>{' '}
              <span style={{ fontWeight: 300 }}>{data.book.description}</span>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowModal(false)} color="primary">
            FECHAR
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

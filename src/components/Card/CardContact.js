import React from 'react';
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: 260,
    fontSize: '"Roboto Slab", "Roboto", sans-serif'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '"Roboto Slab", "Roboto", sans-serif'
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

export default function CardContact({ name, address }) {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();

  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  return (
    <Card plain>
      <CardBody>
        <div className={classes.flex}>
          <h4>As crônicas de Salamandra</h4>
        </div>
        <div className={classes.flex}>
          <div style={{ width: '100%' }}>
            <div>
              <b>Usuário: </b>
              <span className={classes.hint}>Ayrton Gomes</span>
            </div>
            <div>
              <b>Avaliação do usuário: </b>{' '}
              <span className={classes.hint}>5</span>
            </div>
            <div>
              <b>Quem solicitou: </b> <span className={classes.hint}>Eu</span>
            </div>
            <div>
              <b>Interesse em: </b> <span className={classes.hint}>Troca</span>
            </div>
          </div>
          <div className={classes.buttons}>
            <Button color="outlined" onClick={() => setOpen(true)}>
              Avaliar
            </Button>
            <Button color="primary" onClick={() => {}}>
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
          <Button onClick={() => setOpen(false)} color="primary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

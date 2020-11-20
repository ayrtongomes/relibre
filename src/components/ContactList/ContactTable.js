import React from 'react';
import { useAlert } from 'react-alert';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from 'components/CustomButtons/Button.js';
import { Check, Clear, Search } from '@material-ui/icons';
import { formatDistance } from 'utils';
import { useContacts } from 'services/contexts/contact.js';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#5271ff',
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700
  }
});
// {
//     "denied": false,
//     "approved": true,
//     "id_contact": 7,
//     "book": {
//         "id": 26
//     }
// }
export default function CustomizedTables(props) {
  const classes = useStyles();
  const alert = useAlert();

  const { data, toApprove, reloadData } = props;

  const [showModal, setShowModal] = React.useState({
    idContact: null,
    idBook: null,
    approve: true,
    visible: false
  });

  const { approveContact } = useContacts();

  const handleApprove = async () => {
    try {
      const payload = {
        denied: showModal.approve ? false : true,
        approved: showModal.approve ? true : false,
        id_contact: showModal.idContact,
        book: {
          id: showModal.idBook
        }
      };
      const data = await approveContact(payload);
      if (data) {
        alert.success(
          `Contato ${showModal.approve ? 'aprovado' : 'reprovado'}`
        );
      }
    } catch (err) {
      alert.error('Ocorreu um erro ao realizar a operação');
      //Handler error
    } finally {
      setShowModal(value => ({ ...value, visible: false }));
      reloadData();
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Livro</StyledTableCell>
              <StyledTableCell align="left">
                {toApprove ? 'Usuário' : 'Dono'}
              </StyledTableCell>
              <StyledTableCell align="center">
                Avaliação do {toApprove ? 'Usuário' : 'Dono'}
              </StyledTableCell>
              <StyledTableCell align="right">Distância</StyledTableCell>
              <StyledTableCell align="right">Data de criação</StyledTableCell>
              {toApprove ? (
                <StyledTableCell align="right">Ações</StyledTableCell>
              ) : null}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(row => (
              <StyledTableRow key={row.idContact}>
                <StyledTableCell component="th" scope="row">
                  {row.book.title}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.contactInfo.name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.contactInfo.rating < 1
                    ? 'Não avaliado'
                    : row.contactInfo.rating < 1}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {formatDistance(row.contactInfo.distance)}
                </StyledTableCell>
                <StyledTableCell align="right">{row.date}</StyledTableCell>
                {toApprove ? (
                  <StyledTableCell align="right">
                    <div>
                      <>
                        <Button
                          justIcon
                          className={classes.notificationNavLink}
                          onClick={() =>
                            setShowModal({
                              idContact: row.idContact,
                              idBook: row.book.id,
                              approve: true,
                              visible: true
                            })
                          }
                          color="success"
                        >
                          <Check className={classes.icons} />
                        </Button>
                        <Button
                          justIcon
                          className={classes.notificationNavLink}
                          onClick={() =>
                            setShowModal({
                              idContact: row.idContact,
                              idBook: row.book.id,
                              approve: false,
                              visible: true
                            })
                          }
                          color="danger"
                        >
                          <Clear className={classes.icons} />
                        </Button>
                      </>
                    </div>
                  </StyledTableCell>
                ) : null}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={showModal.visible}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setShowModal(value => ({ ...value, visible: false }))}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {showModal.approve ? 'Aprovar contato' : 'Rejeitar contato'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Você deseja mesmo {showModal.approve ? 'aprovar' : 'rejeitar'} esse
            contato?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() =>
              setShowModal(value => ({ ...value, visible: false }))
            }
            color="transparent"
          >
            Cancelar
          </Button>
          <Button onClick={() => handleApprove()} color="success">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

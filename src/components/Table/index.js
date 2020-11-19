import React from 'react';
import { useAlert } from 'react-alert';
import { useHistory } from 'react-router-dom';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from 'components/CustomButtons/Button.js';
import { Edit, Clear, Search } from '@material-ui/icons';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { useBooks } from 'services/contexts/book.js';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: 'rgb(0,18,144, 0.6)',
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

export default function CustomizedTables(props) {
  const classes = useStyles();
  const history = useHistory();
  const alert = useAlert();
  const { data, isWish = false } = props;

  const [showModal, setShowModal] = React.useState({
    id: null,
    visible: false
  });

  const { deleteBook } = useBooks();

  const handleDelete = async () => {
    try {
      const data = await deleteBook(showModal.id);
      if (data && data.status === 'Sucesso') {
        alert.success('Livro apagado com sucesso');
      }
    } catch (err) {
      alert.error('Ocorreu um erro ao tentar apagar o livro');
      //Handler error
    } finally {
      setShowModal(value => ({ ...value, visible: false }));
      history.push('/minha-conta/meus-livros');
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Título</StyledTableCell>
            <StyledTableCell align="right">Autor</StyledTableCell>
            {!isWish && (
              <StyledTableCell align="center">Disponível para</StyledTableCell>
            )}
            <StyledTableCell align="center">Data de criação</StyledTableCell>
            <StyledTableCell align="right">Ações</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(row => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.title}
              </StyledTableCell>
              <StyledTableCell align="right">{row.author}</StyledTableCell>
              {!isWish && (
                <StyledTableCell align="center">{row.type}</StyledTableCell>
              )}
              <StyledTableCell align="center">{row.date}</StyledTableCell>
              <StyledTableCell align="right">
                <div>
                  {!isWish && (
                    <>
                      <Button
                        justIcon
                        //round
                        type="button"
                        className={classes.notificationNavLink}
                        onClick={() => {
                          history.push(
                            `/minha-conta/meus-livros/edit/${row.id}`
                          );
                        }}
                        color="success"
                      >
                        <Edit className={classes.icons} />
                      </Button>
                    </>
                  )}
                  <Button
                    justIcon
                    className={classes.notificationNavLink}
                    onClick={() => setShowModal({ id: row.id, visible: true })}
                    color="danger"
                  >
                    <Clear className={classes.icons} />
                  </Button>
                </div>
              </StyledTableCell>
              <Dialog
                open={showModal.visible}
                TransitionComponent={Transition}
                keepMounted
                onClose={() =>
                  setShowModal(value => ({ ...value, visible: false }))
                }
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle id="alert-dialog-slide-title">
                  {'Apagar livro'}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Você deseja mesmo excluir esse livro?
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
                  <Button onClick={() => handleDelete()} color="danger">
                    Confirmar
                  </Button>
                </DialogActions>
              </Dialog>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

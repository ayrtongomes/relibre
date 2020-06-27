import React from 'react';
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

  const { data, isWish = false } = props;

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Título</StyledTableCell>
            <StyledTableCell align="right">Autor</StyledTableCell>
            {!isWish && (
              <StyledTableCell align="right">Disponível para</StyledTableCell>
            )}
            <StyledTableCell align="right">Data de criação</StyledTableCell>
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
                <StyledTableCell align="right">{row.type}</StyledTableCell>
              )}
              <StyledTableCell align="right">{row.date}</StyledTableCell>
              <StyledTableCell align="right">
                <div>
                  {!isWish && (
                    <>
                      <Button
                        justIcon
                        //round
                        href="#pablo"
                        className={classes.notificationNavLink}
                        onClick={e => e.preventDefault()}
                        color="success"
                      >
                        <Edit className={classes.icons} />
                      </Button>
                      <Button
                        justIcon
                        //round
                        href="#pablo"
                        className={classes.notificationNavLink}
                        onClick={e => e.preventDefault()}
                        color="info"
                      >
                        <Search className={classes.icons} />
                      </Button>
                    </>
                  )}
                  <Button
                    justIcon
                    //round
                    href="#pablo"
                    className={classes.notificationNavLink}
                    onClick={e => e.preventDefault()}
                    color="danger"
                  >
                    <Clear className={classes.icons} />
                  </Button>
                </div>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

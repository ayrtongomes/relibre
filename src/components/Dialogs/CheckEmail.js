import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CheckEmail({ openModal = false, closeModal }) {
  const [open, setOpen] = React.useState(openModal);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={openModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeModal}
        aria-labelledby="alerrt-check-email"
        aria-describedby="alerrt-check-email-desc"
      >
        <DialogTitle id="alerrt-check-email">
          <h3>Cadastro realizado! Valide seu e-mail para prosseguir!</h3>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alerrt-check-email-desc">
            <h4 style={{ fontWeight: 400 }}>
              Foi encaminhado um e-mail de confirmação de cadastro, verifique
              sua caixa de entrada e o spam para validar seu cadastro e efetuar
              o login!
            </h4>
            <h4 style={{ fontWeight: 400 }}>Seja bem-vinde ao Relibre :)</h4>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

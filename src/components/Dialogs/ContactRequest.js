import React from 'react';
import { useAlert } from 'react-alert';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { useContacts } from 'services/contexts/contact.js';
import { useAuth } from 'services/auth';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ContactRequest({
  openModal = false,
  bookId,
  closeModal
}) {
  const alert = useAlert();
  const { createContact } = useContacts();
  const { user } = useAuth();

  const [open, setOpen] = React.useState(openModal);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    if (!bookId)
      return alert.error('Não é possível solicitar o contato desse livro');
    try {
      if (user && user.token) {
        const payload = {
          id_book: bookId
        };

        const { data, errors } = await createContact(payload);
        if (errors) {
          return alert.error('Não é possível solicitar o contato desse livro');
        } else {
          alert.success('Solicitação enviada com sucesso!');
        }
      }
    } catch (err) {
      return alert.error('Não é possível solicitar o contato desse livro');
    } finally {
      closeModal();
    }
  };

  return (
    <div>
      <Dialog
        open={openModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeModal}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {'Deseja solicitar o contato do proprietário desse livro?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Ao clicar em confirmar o usuário receberá sua solicitação e assim
            que for aprovada você poderá ter acesso aos dados de contato desse
            usuário.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} color="primary">
            Cancelar
          </Button>
          <Button onClick={() => handleSubmit()} color="primary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

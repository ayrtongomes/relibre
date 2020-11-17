import React from 'react';
import { useAlert } from 'react-alert';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import { useContacts } from 'services/contexts/contact.js';

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

  const [open, setOpen] = React.useState(openModal);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');

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
      const payload = {
        id_book: bookId,
        name: name,
        phone: phone,
        email: email
      };

      const { data, errors } = await createContact(payload);
      if (errors) {
        return alert.error('Não é possível solicitar o contato desse livro');
      } else {
        alert.success('Solicitação enviada com sucesso!');
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
        <DialogTitle id="form-dialog-title">
          Está interessado nesse livro?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Preencha o formulário que entrarão em contato com você.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nome"
            type="text"
            fullWidth
            inputProps={{
              value: name,
              onChange: e => setName(e.target.value)
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="E-mail"
            type="email"
            fullWidth
            inputProps={{
              value: email,
              onChange: e => setEmail(e.target.value)
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="phone"
            type="phone"
            label="Telefone"
            fullWidth
            inputProps={{
              value: phone,
              onChange: e => setPhone(e.target.value)
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} color="primary">
            Cancelar
          </Button>
          <Button onClick={() => handleSubmit()} color="primary">
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

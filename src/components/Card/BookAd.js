import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ContactFormRequest from 'components/Dialogs/ContactFormRequest';
import ContactRequest from 'components/Dialogs/ContactRequest';
import { useAuth } from 'services/auth';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 290,
    width: 290,
    minWidth: 290,
    alignSelf: 'baseline',
    justifySelf: 'center',
    backgroundSize: '200%',
    overflow: 'visible',
    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
    transition: '0.6s',
    backgroundImage:
      'linear-gradient(45deg, rgba(255,255,255,1) 38%, rgba(7,144,227,1) 80%)',
    '&:hover': {
      backgroundPosition: 'right'
    }
  },
  icon: {
    padding: '0.5rem 1rem',
    backgroundColor: '#dedede',
    borderRadius: '5px',
    margin: '0 1rem',
    '& img': {
      height: '45px'
    }
  },
  media: {
    height: '358px',
    paddingTop: '56.25%' // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: '#4caf50',
    width: '40px',
    height: '32px',
    borderRadius: '6px'
  },
  title: {
    fontSize: '15px'
  }
}));

export default ({ data, ...props }) => {
  const classes = useStyles();
  const { user } = useAuth();

  const [expanded, setExpanded] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const getModal = () => {
    if (user && user.token) {
      return (
        <ContactRequest
          openModal={showModal}
          bookId={data.id}
          closeModal={() => setShowModal(false)}
        />
      );
    }
    return (
      <ContactFormRequest
        openModal={showModal}
        bookId={data.id}
        closeModal={() => setShowModal(false)}
      />
    );
  };
  return (
    <Card className={classes.root}>
      <CardHeader
        classes={{ title: classes.title }}
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            Ad
          </Avatar>
        }
        title={data.name}
      />
      <CardMedia
        className={classes.media}
        image={data.images[0].image}
        title={'Imagem do livro ' + data.book.title}
      />
      <CardContent>
        <div style={{ minHeight: '60px' }}>
          <h4 style={{ textAlign: 'left', margin: '0', fontSize: '16px' }}>
            {data.book.title}
          </h4>
          <Typography variant="body2" color="textSecondary" component="p">
            {data.book.description}
          </Typography>
        </div>
      </CardContent>
      <CardActions disableSpacing>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setShowModal(true)}
        >
          tenho interesse
        </Button>
        {/* <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          </IconButton> 
        > */}
        <h4
          style={{
            textAlign: 'right',
            margin: '0 auto',
            color: 'rgb(89, 85, 85)'
          }}
        >
          R$ {data.price}
        </h4>
      </CardActions>
      {getModal()}
    </Card>
  );
};

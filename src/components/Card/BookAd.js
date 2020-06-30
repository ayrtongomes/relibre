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

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 325,
    width: 325,
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
    height: '470px',
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
  }
}));

export default props => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            Ad
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.name}
      />
      <CardMedia
        className={classes.media}
        image="http://books.google.com/books/content?id=NgcjBgAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
        title="HP"
      />
      <CardContent>
        <h4 style={{ textAlign: 'left' }}>
          Harry Potter e o Enigma do Príncipe
        </h4>
        <Typography variant="body2" color="textSecondary" component="p">
          Seminovo, perfeito estado. Preço bacana.
        </Typography>
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
          R$ 7,99
        </h4>
      </CardActions>
      <ContactFormRequest
        openModal={showModal}
        closeModal={() => setShowModal(false)}
      />
    </Card>
  );
};

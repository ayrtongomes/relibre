import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Explore from '@material-ui/icons/Explore';
import ContactRequest from 'components/Dialogs/ContactRequest';
import matchSrcIcon from 'assets/img/friendship.svg';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 325,
    alignSelf: 'baseline',
    justifySelf: 'center',
    backgroundSize: '200%',
    overflow: 'visible',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    transition: '0.6s',
    backgroundImage: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
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
    backgroundColor: blue[500]
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
            {props.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        action={
          <div
            style={{
              color: '#fff',
              height: 'auto',
              display: 'flex',
              alignItems: 'center',
              marginTop: '22%',
              marginRight: '3px'
            }}
          >
            <Explore />
            <span
              style={{
                fontWeight: '300',
                marginLeft: '5px',
                textTransform: 'itallic'
              }}
            >
              {props.distance} km
            </span>
          </div>
        }
        title={props.name}
        subheader="30 de junho de 2020"
      />
      <CardMedia
        className={classes.media}
        image="http://books.google.com/books/content?id=PDcQCwAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
        title="Paella dish"
      />
      <CardContent>
        <h4 style={{ textAlign: 'left' }}>Harry Potter e a Pedra Filosofal</h4>
        <Typography variant="body2" color="textSecondary" component="p">
          Nunca li, ganhei de presente. Troco por algum do Tolkien.
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
        <div className={classes.icon}>
          <img src={matchSrcIcon} />
        </div>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            <b>
              Parabéns, você encontrou uma combinação! O que isso significa?
            </b>
          </Typography>
          <Typography paragraph>
            Significa que esse usuário tem o livro que você deseja e você possui
            um livro que ele está interesado.
          </Typography>
          <Typography paragraph>
            <b>Este livro está disponível para:</b>
          </Typography>
          <Typography paragraph>Troca, venda e empréstimo e doação.</Typography>
        </CardContent>
      </Collapse>
      <ContactRequest
        openModal={showModal}
        closeModal={() => setShowModal(false)}
      />
    </Card>
  );
};

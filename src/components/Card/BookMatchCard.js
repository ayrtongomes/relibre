import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
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
import { formatDistance } from 'utils';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 325,
    width: 325,
    minWidth: 325,
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

const getTypes = types => {
  let arr = [];
  if (types.some(t => t.description === 'Trocar')) {
    arr.push('Troca');
  }
  if (types.some(t => t.description === 'Emprestar')) {
    arr.push('Empréstimo');
  }
  if (types.some(t => t.description === 'Doar')) {
    arr.push('Doação');
  }

  let str = '';

  arr.map((type, idx) => {
    if (idx === 0) {
      str = type;
    } else if (idx + 1 === arr.length) {
      str += ` e ${type}`;
    } else {
      str += `, ${type}`;
    }
  });

  return str;
};

export default ({ data, ...props }) => {
  console.log(data);
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
            {data && data.name ? data.name.charAt(0).toUpperCase() : 'A'}
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
              {formatDistance(data.distance)}
            </span>
          </div>
        }
        title={data && data.name ? data.name : 'Anônimo'}
        subheader={format(new Date(data.book.created_at), 'dd/MM/yyyy HH:mm', {
          locale: ptBR
        })}
      />
      <CardMedia
        className={classes.media}
        image={data.images[0].image}
        title={'Imagem do livro ' + (data.book.title || 'Livro sem título')}
      />
      <CardContent>
        <h4 style={{ textAlign: 'left' }}>
          {data.book.title || 'Livro sem título'}
        </h4>
        <Typography variant="body2" color="textSecondary" component="p">
          {data.book.description}
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
          <Typography paragraph>{getTypes(data.types)}</Typography>
        </CardContent>
      </Collapse>
      <ContactRequest
        openModal={showModal}
        closeModal={() => setShowModal(false)}
      />
    </Card>
  );
};

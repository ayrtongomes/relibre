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
import { formatDistance } from 'utils';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 290,
    width: 290,
    minWidth: 290,
    alignSelf: 'baseline',
    justifySelf: 'center',
    fontFamily: "'Inter', 'Roboto', sans-serif"
  },
  media: {
    height: '358px'
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
  },
  title: {
    fontSize: '15px'
  },
  subheader: {
    fontSize: '13px'
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
const ENUM_MONTHS = {
  '01': 'Janeiro',
  '02': 'Fevereiro',
  '03': 'Março',
  '04': 'Abril',
  '05': 'Maio',
  '06': 'Junho',
  '07': 'Julho',
  '08': 'Agosto',
  '09': 'Setembro',
  '10': 'Outubro',
  '11': 'Novembro',
  '12': 'Dezembro'
};
const formatExtensive = date => {
  const dateArr = date.split('/');
  return `${dateArr[0]} de ${ENUM_MONTHS[dateArr[1]]} de ${dateArr[2]}`;
};

export default ({ data, ...props }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        classes={{
          title: classes.title,
          subheader: classes.subheader
        }}
        // avatar={
        //   <Avatar aria-label="recipe" className={classes.avatar}>
        //     {data && data.name ? data.name.charAt(0).toUpperCase() : 'A'}
        //   </Avatar>
        // }
        action={
          <div
            style={{
              color: '#808080',
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
        subheader={formatExtensive(
          format(new Date(data.created_at), 'dd/MM/yyyy', {
            locale: ptBR
          })
        )}
      />
      <CardMedia
        className={classes.media}
        image={data.images[0].image}
        title={'Imagem do livro ' + data.book.title}
      />
      <CardContent>
        <div style={{ minHeight: '80px' }}>
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
          <Typography paragraph style={{ textAlign: 'left', fontSize: '14px' }}>
            <b>Este livro está disponível para:</b>
          </Typography>
          <Typography paragraph style={{ textAlign: 'left', fontSize: '14px' }}>
            {getTypes(data.types)}
          </Typography>
        </CardContent>
      </Collapse>
      <ContactRequest
        openModal={showModal}
        bookId={data.id}
        closeModal={() => setShowModal(false)}
      />
    </Card>
  );
};

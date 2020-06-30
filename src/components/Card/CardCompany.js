import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: 260,
    fontSize: '"Roboto Slab", "Roboto", sans-serif'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '"Roboto Slab", "Roboto", sans-serif'
  },
  content: {
    flex: '1 0 auto',
    textAlign: 'left'
  },
  cover: {
    width: '70%'
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  playIcon: {
    height: 38,
    width: 38
  }
}));

export default function MediaControlCard({ name, address }) {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.cover}
        image="http://via.placeholder.com/640x360"
        title="Live from space album cover"
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography
            style={{
              textAlign: 'left',
              fontFamily: '"Roboto Slab", "Roboto", sans-serif',
              fontWeight: 600,
              color: '#3C4858'
            }}
            component="h5"
            variant="h5"
          >
            {name}
          </Typography>
          <Typography color="textSecondary">{address}</Typography>
          <hr />
          <Typography paragraph color="textSecondary">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </Typography>
          <div style={{ textAlign: 'right', marginTop: '45px' }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => history.push('/comerciante-info/tio-zico')}
            >
              Ver mais
            </Button>
          </div>
        </CardContent>
        {/* <div className={classes.controls}>
          <IconButton aria-label="previous">
            {theme.direction === 'rtl' ? (
              <SkipNextIcon />
            ) : (
              <SkipPreviousIcon />
            )}
          </IconButton>
          <IconButton aria-label="play/pause">
            <PlayArrowIcon className={classes.playIcon} />
          </IconButton>
          <IconButton aria-label="next">
            {theme.direction === 'rtl' ? (
              <SkipPreviousIcon />
            ) : (
              <SkipNextIcon />
            )}
          </IconButton>
        </div> */}
      </div>
    </Card>
  );
}

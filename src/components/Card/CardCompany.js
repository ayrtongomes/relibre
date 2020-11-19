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
import placeholder from 'assets/img/store-placeholder.svg';
import { useHistory } from 'react-router-dom';
import { formatAddress } from 'utils';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: 260,
    fontSize: '"Inter", "Roboto", sans-serif'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '"Inter", "Roboto", sans-serif',
    width: '100%',
    height: '100%'
  },
  content: {
    flex: '1 0 auto',
    textAlign: 'left',
    width: '100%',
    height: '100%',
    position: 'relative'
  },
  cover: {
    width: '30%'
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
  },
  bottomContainer: {
    position: 'absolute',
    bottom: '16px',
    width: '95%'
  },
  bottomContent: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '95%'
  }
}));

export default function MediaControlCard({ data }) {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.cover}
        image={placeholder}
        title="Live from space album cover"
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography
            style={{
              textAlign: 'left',
              fontFamily: '"Inter", "Roboto", sans-serif',
              fontWeight: 600,
              color: '#3C4858'
            }}
            component="h5"
            variant="h5"
          >
            {data.name}
          </Typography>
          <Typography color="textSecondary">
            {formatAddress(data.addresses[0])}
          </Typography>
          <hr />
          <Typography paragraph color="textSecondary">
            {data.description}
          </Typography>
          <div className={classes.bottomContainer}>
            <div className={classes.bottomContent}>
              <div>
                <b>Site:</b>{' '}
                <a href={data.webSite || '#'} target="_blank">
                  {data.webSite}
                </a>
              </div>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => history.push(`/comerciante/${data.id}`)}
              >
                Ver mais
              </Button>
            </div>
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

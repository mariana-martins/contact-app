import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Button, ButtonGroup, Hidden, Fab } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.up('md')]: {
      marginBottom: theme.spacing(3)
    }
  },
  button: {
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(1, 0)
    }
  },
  addIcon: {
    marginRight: theme.spacing(0.5)
  },
  fab: {
    margin: 0,
    top: 'auto',
    right: theme.spacing(3),
    bottom: theme.spacing(3),
    left: 'auto',
    position: 'fixed',
    zIndex: 99
  },
  link: {
    textDecoration: 'none'
  }
}));

function MenuBar({ filterMode, onFilterChange }) {
  const classes = useStyles();
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'));

  return (
    <Grid container className={classes.root}>
      <Grid
        container
        item
        xs={12}
        md={6}
        justify={isMobile ? 'center' : 'flex-start'}
      >
        <ButtonGroup fullWidth className={classes.button}>
          {' '}
          {/* TODO: ADD ARIA-LABEL */}
          <Button
            disabled={filterMode === 'all'}
            onClick={() => onFilterChange('all')}
            color="primary"
            variant="contained"
          >
            ALL
          </Button>
          <Button
            disabled={filterMode === 'favorites'}
            color="primary"
            variant="contained"
            onClick={() => onFilterChange('favorites')}
          >
            MY FAVORITES
          </Button>
        </ButtonGroup>
      </Grid>
      <Hidden smDown>
        <Grid container item md={6} justify={'flex-end'}>
          <Link to="/add" className={classes.link}>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
            >
              <AddCircleIcon className={classes.addIcon} /> New Contact
            </Button>
          </Link>
        </Grid>
      </Hidden>
      <Hidden mdUp>
        <Link to="/add" className={classes.link}>
          <Fab color="primary" aria-label="add" className={classes.fab}>
            <AddIcon />
          </Fab>
        </Link>
      </Hidden>
    </Grid>
  );
}

export default MenuBar;

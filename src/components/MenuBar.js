import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Button, ButtonGroup } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(3),
  },
  button: {
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(1, 0),
    },
  },
  addIcon: {
    marginRight: theme.spacing(0.5),
  },
}));

function MenuBar({ filterMode, onFilterChange }) {
  const classes = useStyles();
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'));

  return (
    <Grid container className={classes.root}>
      <Grid container item xs={12} md={6} justify={isMobile ? "center" : "flex-start"}>
        <ButtonGroup fullWidth className={classes.button}> {/* TODO: ADD ARIA-LABEL */}
          <Button
            disabled={filterMode === "all"}
            onClick={() => onFilterChange("all")}
          >
            ALL
            </Button>
          <Button
            disabled={filterMode === "favorites"}
            onClick={() => onFilterChange("favorites")}
          >
            MY FAVORITES
            </Button>
        </ButtonGroup>
      </Grid>
      <Grid container item xs={12} md={6} justify={isMobile ? "center" : "flex-end"}>
        <Link to="/add">
          <Button className={classes.button}>
            <AddCircleIcon className={classes.addIcon} /> New Contact
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
}

export default MenuBar;

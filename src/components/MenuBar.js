import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Button, ButtonGroup } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(3),
  },
  addIcon: {
    marginRight: theme.spacing(0.5),
  },
}));

function MenuBar({ filterMode, onFilterChange }) {

  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid container item xs={9} md={6} justify="flex-start">
        <ButtonGroup fullWidth> {/* TODO: ADD ARIA-LABEL */}
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
      <Grid container item xs={3} md={6} justify="flex-end">
        <Link to="/add">
          <Button>
            <AddCircleIcon className={classes.addIcon} /> New Contact
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
}

export default MenuBar;

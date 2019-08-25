import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
  },
}));

function Footer() {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={12}>
        <footer className={classes.root}>
          <Typography variant="overline">
            © 2019. Design & Implementation by Mariana Martins Menezes
          </Typography>
        </footer>
      </Grid>
    </Grid>
  );
}

export default Footer;

import { Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
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
            Created by Mariana Martins Menezes
          </Typography>
        </footer>
      </Grid>
    </Grid>
  );
}

export default Footer;

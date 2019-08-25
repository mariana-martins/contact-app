import React from 'react';
import { Redirect } from 'react-router-dom';
import { Grid, Typography } from '@material-ui/core';

function NotFound() {
  const [redirectToHome, setRedirectToHome] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setRedirectToHome(true);
    }, 10000);
    return () => clearTimeout(timer);
  });

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h1">Page not found</Typography>
        <Typography variant="h2">
          Going to redirect to home in 10 seconds
        </Typography>
      </Grid>
      {redirectToHome && <Redirect to="/" />}
    </Grid>
  );
}

export default NotFound;

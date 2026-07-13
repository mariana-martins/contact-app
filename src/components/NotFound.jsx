import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';

function NotFound() {
  const [redirectToHome, setRedirectToHome] = useState(false);

  useEffect(() => {
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
      {redirectToHome && <Navigate to="/" />}
    </Grid>
  );
}

export default NotFound;

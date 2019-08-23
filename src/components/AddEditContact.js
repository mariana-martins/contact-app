import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Typography, Button, Paper, TextField, FormControlLabel, Checkbox } from '@material-ui/core';

function AddEditContact({ match }) {
  const [values, setValues] = React.useState({
    name: '',
    email: '',
    telephone: '',
    favorite: false,
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleCheckbox = name => event => {
    setValues({ ...values, [name]: event.target.checked });
  };

  const isAddMode = !match.params.id;
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h1">
          {isAddMode ? 'Add a new contact information' : 'Edit an existent contact'}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <form noValidate autoComplete="off">
          <TextField
            label="Name"
            value={values.name}
            onChange={handleChange('name')}
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Email"
            value={values.email}
            onChange={handleChange('email')}
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Telephone"
            value={values.telephone}
            onChange={handleChange('telephone')}
            variant="outlined"
            fullWidth
          />
          <FormControlLabel
            control={
              <Checkbox checked={values.favorite} onChange={handleCheckbox('favorite')} value="favorite" />
            }
            label="Is favorite?"
          />
          <Link to="/">
            <Button variant="contained">
              Cancel
            </Button>
          </Link>
          <Button variant="contained">Save</Button>
        </form>
      </Grid>
    </Grid>
  );
}

export default AddEditContact;

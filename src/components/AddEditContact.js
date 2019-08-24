import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Grid, Typography, Button, TextField, FormControlLabel, Checkbox } from '@material-ui/core';
import { getContactBySlug, upsertContact, deleteContactBySlug } from '../storage';
import { slugify } from '../utils';

function AddEditContact({ match }) {
  const isAddMode = !(match && match.params && match.params.id);
  const [values, setValues] = React.useState(isAddMode
    ? {
      name: '',
      email: '',
      telephone: '',
      favorite: false,
    }
    : getContactBySlug(match.params.id));

  const [saved, setSaved] = React.useState(false);

  const [errorMessage, setErrorMessage] = React.useState(null);

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleCheckbox = name => event => {
    setValues({ ...values, [name]: event.target.checked });
  };

  const validateRequired = (value) => {
    return value && value.trim() !== '';
  }

  const isFormValid = () => {
    const { name, email } = values;
    return validateRequired(name) && validateRequired(email);
  };

  const saveContact = () => {
    const slug = slugify(values.name);
    const savedContact = getContactBySlug(slug);

    if (isAddMode && savedContact !== undefined) {
      setErrorMessage("This contact already exists.");
      return;
    }

    upsertContact({
      ...values,
      slug,
    });
    /*
      If user changes the contact name, it's going to change the slug.
      We use slug as unique identifier for contacts.
      So, if slug changes it's going to insert a new contact.
      Now, we have to delete the old one.
    */
    if (!isAddMode && slug !== match.params.id) {
      deleteContactBySlug(match.params.id);
    }
    setSaved(true);
  };

  return (
    <Grid container>
      {saved && <Redirect to="/" />}
      <Grid item xs={12}>
        <Typography variant="h1">
          {isAddMode ? 'Add a new contact information' : 'Edit an existent contact'}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>
          {errorMessage}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <form noValidate>
          <TextField
            label="Name"
            value={values.name}
            onChange={handleChange('name')}
            variant="outlined"
            fullWidth
            required
          />
          <TextField
            label="Email"
            value={values.email}
            onChange={handleChange('email')}
            variant="outlined"
            fullWidth
            required
          />
          <TextField
            label="Telephone"
            value={values.telephone}
            onChange={handleChange('telephone')}
            variant="outlined"
            type="tel"
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
          <Button
            variant="contained"
            disabled={!isFormValid()}
            onClick={saveContact}
          >
            Save
          </Button>
        </form>
      </Grid>
    </Grid>
  );
}

export default AddEditContact;

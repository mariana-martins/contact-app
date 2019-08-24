import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Grid, Typography, Button, TextField, FormControlLabel, Checkbox } from '@material-ui/core';
import { getContactBySlug, upsertContact, deleteContactBySlug } from '../storage';
import { slugify } from '../utils';

// Using W3C regexp available on https://emailregex.com/
const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// Reference: https://regexr.com/3c53v
// eslint-disable-next-line
const telephoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;

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

  // If it is on edit mode and contact does not exist than go to home.
  if (!isAddMode && !getContactBySlug(match.params.id)) {
    return <Redirect to="/" />;
  }

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
    return validateRequired(name) &&
      validateRequired(email) &&
      emailRegex.test(email);
  };

  const isEmailValid = () => {
    const { email } = values;
    return !email || emailRegex.test(email);
  }

  const isTelephoneValid = () => {
    const { telephone } = values;
    return !telephone || telephoneRegex.test(telephone);
  }

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
            type="email"
            required
            fullWidth
            error={!isEmailValid()}
            helperText={!isEmailValid() && 'Email is invalid.'}
          />
          <TextField
            label="Telephone"
            value={values.telephone}
            onChange={handleChange('telephone')}
            variant="outlined"
            type="tel"
            fullWidth
            error={!isTelephoneValid()}
            helperText={!isTelephoneValid() && 'Telephone is invalid.'}
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

import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Grid, Typography, Button, TextField, FormControlLabel, Checkbox, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getContactBySlug, upsertContact, deleteContactBySlug } from '../storage';
import { slugify } from '../utils';
import Footer from './Footer';

// Using W3C regexp available on https://emailregex.com/
const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// Reference: https://regexr.com/3c53v
// eslint-disable-next-line
const telephoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(8),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
    }
  },
  field: {
    margin: theme.spacing(1, 0),
  },
  link: {
    textDecoration: 'none',
  },
}));

function AddEditContact({ match }) {
  const isAddMode = !(match && match.params && match.params.id);
  const [values, setValues] = React.useState(isAddMode
    ? {
      name: '',
      email: '',
      telephone: '',
      favorite: true,
    }
    : getContactBySlug(match.params.id));

  const [saved, setSaved] = React.useState(false);

  const classes = useStyles();

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
      isNameValid() &&
      validateRequired(email) &&
      emailRegex.test(email);
  };

  const isNameValid = () => {
    const slug = slugify(values.name);
    const savedContact = getContactBySlug(slug);
    if (isAddMode) {
      return !savedContact;
    } else {
      return !savedContact || slug === match.params.id;
    }
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
          {isAddMode ? 'Add new contact' : 'Edit contact'}
        </Typography>
      </Grid>
      <Paper className={classes.root}>
        <form noValidate>
          <Grid container>
            <Grid item xs={12}>
              <TextField
                label="Name"
                value={values.name}
                onChange={handleChange('name')}
                variant="outlined"
                fullWidth
                required
                error={!isNameValid()}
                helperText={!isNameValid() && 'This contact already exists.'}
                className={classes.field}
              />
            </Grid>
            <Grid item xs={12}>
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
                className={classes.field}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Telephone"
                value={values.telephone}
                onChange={handleChange('telephone')}
                variant="outlined"
                type="tel"
                fullWidth
                error={!isTelephoneValid()}
                helperText={!isTelephoneValid() && 'Telephone is invalid.'}
                className={classes.field}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={values.favorite}
                    onChange={handleCheckbox('favorite')}
                    value="favorite" />
                }
                label="Is it a favorite contact?"
                className={classes.field}
              />
            </Grid>
            <Grid container item xs={12} spacing={1}>
              <Grid item>
                <Link to="/" className={classes.link}>
                  <Button variant="outlined">Cancel</Button>
                </Link>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  disabled={!isFormValid()}
                  onClick={saveContact}
                  color="primary"
                >
                  Save
              </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <Footer />
    </Grid>
  );
}

export default AddEditContact;

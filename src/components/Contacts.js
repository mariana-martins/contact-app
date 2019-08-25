import React from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { getContacts, getContactBySlug, upsertContact, deleteContactBySlug } from '../storage';
import ContactsList from './ContactsList';
import ContactsTable from './ContactsTable';
import SuccessMessage from './SuccessMessage';
import MenuBar from './MenuBar';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(8),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
    }
  },
}));

function ContactListing() {
  const [successMessage, setSuccessMessage] = React.useState(null);
  const [filterMode, setFilterMode] = React.useState('all');
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'));

  const deleteContact = (slug) => {
    deleteContactBySlug(slug);
    setSuccessMessage('Your contact was deleted!');
  };

  const toggleFavorite = (e, slug, name) => {
    const contact = getContactBySlug(slug);
    contact.favorite = !contact.favorite;
    upsertContact(contact);
    const message = contact.favorite
      ? `${name} is a favorite contact now!`
      : `${name} isn't a favorite contact now!`
    setSuccessMessage(message);
    e.stopPropagation();
  };

  const getFilteredContacts = () => {
    if (filterMode === "all") {
      return getContacts();
    }

    if (filterMode === "favorites") {
      return getContacts().filter((contact) => contact.favorite);
    }

    // Filter mode not expected
    return [];
  };

  const classes = useStyles();
  const contacts = getFilteredContacts();
  const RenderContacts = isMobile ? ContactsList : ContactsTable;

  return (
    <Paper className={classes.root}>
      {successMessage && <SuccessMessage message={successMessage} onClose={() => setSuccessMessage(null)} />}
      <Grid container>
        <Grid item xs={12}>
          <MenuBar filterMode={filterMode} onFilterChange={setFilterMode} />
        </Grid>
        <Grid item xs={12}>
          <RenderContacts
            data={contacts}
            toggleFavorite={toggleFavorite}
            deleteContact={deleteContact}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}

function Contacts() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h1">Contact App</Typography>
      </Grid>
      <Grid item xs={12}>
        <ContactListing />
      </Grid>
    </Grid>
  );
}

export default Contacts;

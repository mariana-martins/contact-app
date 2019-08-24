import React from 'react';
import { Link, Route } from 'react-router-dom';
import { Grid, Typography, Button, ButtonGroup, Paper, Table, TableBody, TableRow, TableCell } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getContacts, getContactBySlug, upsertContact, deleteContactBySlug } from '../storage';
import DeleteDialog from './DeleteDialog';
import SuccessMessage from './SuccessMessage';

function ListContactsHeader() {
  return (
    <Typography variant="h1">Contact App</Typography>
  );
}

function MenuBar({ filterMode, onFilterChange }) {
  return (
    <Grid container>
      <Grid container item xs={9} md={6} justify="flex-start">
        <ButtonGroup> {/* TODO: ADD ARIA-LABEL */}
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
          <Button variant="contained">
            New Contact
            </Button>
        </Link>
      </Grid>
    </Grid>
  );
}

function ContactEntry({ entry, toggleFavorite, children }) {
  const { slug, name, email, telephone, favorite } = entry;
  return (
    <Route key={name} render={({ history }) => (
      <TableRow onClick={() => history.push(`/edit/${slug}`)}>
        <TableCell onClick={(e) => toggleFavorite(e, slug, name)}>{favorite ? '⭐' : '🔲'}</TableCell>
        <TableCell>{name}</TableCell>
        <TableCell>{email}</TableCell>
        <TableCell>{telephone}</TableCell>
        <TableCell>{children}</TableCell>
      </TableRow>
    )} />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(8),
  },
}));

function ContactListing() {

  const [successMessage, setSuccessMessage] = React.useState(null);
  const [filterMode, setFilterMode] = React.useState('all');

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

  const rows = getFilteredContacts();

  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      {successMessage && <SuccessMessage message={successMessage} onClose={() => setSuccessMessage(null)} />}
      <Grid container>
        <Grid item xs={12}>
          <MenuBar filterMode={filterMode} onFilterChange={setFilterMode} />
        </Grid>
        <Grid item xs={12}>
          <Table>
            <TableBody>
              {rows.map(row => (
                <ContactEntry entry={row} toggleFavorite={toggleFavorite}>
                  <DeleteDialog
                    name={row.name}
                    onConfirm={() => deleteContact(row.slug)}
                  />
                </ContactEntry>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </Paper>
  );
}

function ListContacts() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <ListContactsHeader />
      </Grid>
      <Grid item xs={12}>
        <ContactListing />
      </Grid>
    </Grid>
  );
}

export default ListContacts;

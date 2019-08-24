import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Typography, Button, ButtonGroup, Paper, Table, TableBody, TableRow, TableCell } from '@material-ui/core';
import { getContacts, deleteContactBySlug } from '../storage';
import DeleteDialog from './DeleteDialog';

function ListContactsHeader() {
  return (
    <Typography variant="h1">Contact App</Typography>
  );
}

function ContactListing() {

  const [successMessage, setSuccessMessage] = React.useState(null);

  const deleteContact = (slug) => {
    deleteContactBySlug(slug);

    setSuccessMessage('Your contact was deleted!');
  };

  const rows = getContacts();

  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={6}>
            <ButtonGroup> {/* TODO: ADD ARIA-LABEL */}
              <Button>ALL</Button>
              <Button>MY FAVORITES</Button>
            </ButtonGroup>
          </Grid>
          <Grid item xs={6}>
            <Link to="/add">
              <Button variant="contained">
                New Contact
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography>
          {successMessage}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Paper>
          <Table>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.name}>
                  <TableCell>{row.favorite ? '⭐' : '👩'}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.telephone}</TableCell>
                  <TableCell>
                    <DeleteDialog
                      name={row.name}
                      onConfirm={() => deleteContact(row.slug)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>

      </Grid>
    </Grid>
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

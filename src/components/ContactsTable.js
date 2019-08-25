import React from 'react';
import { Route } from 'react-router-dom';
import { Button, Table, TableBody, TableRow, TableCell } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteDialog from './DeleteDialog';

function ContactRow({ entry, toggleFavorite, children }) {
  const { slug, name, email, telephone, favorite } = entry;
  return (
    <Route key={name} render={({ history }) => (
      <TableRow onClick={() => history.push(`/edit/${slug}`)}>
        <TableCell>
          <Button onClick={(e) => toggleFavorite(e, slug, name)}>
            {favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </Button>
        </TableCell>
        <TableCell>{name}</TableCell>
        <TableCell>{email}</TableCell>
        <TableCell>{telephone}</TableCell>
        <TableCell>{children}</TableCell>
      </TableRow>
    )} />
  );
}

function ContactsTable({ data, toggleFavorite, deleteContact }) {
  return (
    <Table>
      <TableBody>
        {data.map(entry => (
          <ContactRow key={entry.name} entry={entry} toggleFavorite={toggleFavorite}>
            <DeleteDialog
              name={entry.name}
              onConfirm={() => deleteContact(entry.slug)}
            />
          </ContactRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default ContactsTable;

import React from 'react';
import { Route } from 'react-router-dom';
import {
  IconButton,
  Table,
  TableBody,
  TableRow,
  TableCell
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import indigo from '@material-ui/core/colors/indigo';
import grey from '@material-ui/core/colors/grey';
import DeleteDialog from './DeleteDialog';

const useStyles = makeStyles({
  row: {
    '&:hover': {
      backgroundColor: grey[100],
      cursor: 'pointer'
    }
  },
  button: {
    '&:hover': {
      backgroundColor: indigo[100]
    }
  }
});

function ContactRow({ entry, toggleFavorite, children }) {
  const { slug, name, email, telephone, favorite } = entry;
  const classes = useStyles();
  return (
    <Route
      key={name}
      render={({ history }) => (
        <TableRow
          className={classes.row}
          onClick={() => history.push(`/edit/${slug}`)}
        >
          <TableCell>
            <IconButton
              onClick={e => toggleFavorite(e, slug, name)}
              className={classes.button}
            >
              {favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          </TableCell>
          <TableCell>{name}</TableCell>
          <TableCell>{email}</TableCell>
          <TableCell>{telephone}</TableCell>
          <TableCell>{children}</TableCell>
        </TableRow>
      )}
    />
  );
}

function ContactsTable({ data, toggleFavorite, deleteContact }) {
  return (
    <Table>
      <TableBody>
        {data.map(entry => (
          <ContactRow
            key={entry.name}
            entry={entry}
            toggleFavorite={toggleFavorite}
          >
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

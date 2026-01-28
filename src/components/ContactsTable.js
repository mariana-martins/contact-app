import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IconButton,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { indigo, grey } from '@mui/material/colors';
import DeleteDialog from './DeleteDialog';

const useStyles = makeStyles({
  row: {
    '&:hover': {
      backgroundColor: grey[100],
      cursor: 'pointer',
    },
  },
  button: {
    '&:hover': {
      backgroundColor: indigo[100],
    },
  },
});

function ContactRow({ entry, toggleFavorite, children }) {
  const { slug, name, email, telephone, favorite } = entry;
  const navigate = useNavigate();
  const classes = useStyles();
  return (
    <TableRow className={classes.row} onClick={() => navigate(`/edit/${slug}`)}>
      <TableCell>
        <IconButton
          onClick={(e) => toggleFavorite(e, slug, name)}
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
  );
}

function ContactsTable({ data, toggleFavorite, deleteContact }) {
  return (
    <Table>
      <TableBody>
        {data.map((entry) => (
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

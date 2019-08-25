import React from 'react';
import { Route } from 'react-router-dom';
import { IconButton, List, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction, Typography, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import indigo from '@material-ui/core/colors/indigo';
import DeleteDialog from './DeleteDialog';

const useContactItemsStyles = makeStyles({
  itemGutters: {
    padding: 0,
  },
  textSecondary: {
    '& span': {
      display: 'block',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  },
  avatarFlex: {
    margin: 'auto',
  },
  button:{
    '&:hover': {
      backgroundColor: indigo[100],
    },
  },
});

function ContactItem({ entry, toggleFavorite, children }) {
  const { slug, name, email, telephone, favorite } = entry;
  const classes = useContactItemsStyles();
  return (
    <Route key={name} render={({ history }) => (
      <ListItem
        alignItems="flex-start"
        onClick={() => history.push(`/edit/${slug}`)}
        classes={{ gutters: classes.itemGutters }}
      >
        <ListItemAvatar classes={{ alignItemsFlexStart: classes.avatarFlex }}>
          <IconButton
            onClick={(e) => toggleFavorite(e, slug, name)}
            className={classes.button}
          >
            {favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </ListItemAvatar>
        <ListItemText
          classes={{ secondary: classes.textSecondary }}
          primary={name}
          secondary={
            <>
              <Typography component="span">{email}</Typography>
              <Typography component="span">{telephone}</Typography>
            </>
          }
        />
        <ListItemSecondaryAction>
          {children}
        </ListItemSecondaryAction>
      </ListItem>
    )} />
  );
}

function ContactsList({ data, toggleFavorite, deleteContact }) {
  return (
    <List>
      {data.map(entry => (
        <React.Fragment key={entry.name}>
          <ContactItem entry={entry} toggleFavorite={toggleFavorite}>
            <DeleteDialog
              name={entry.name}
              onConfirm={() => deleteContact(entry.slug)}
            />
          </ContactItem>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );
}

export default ContactsList;

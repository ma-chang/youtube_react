import { AppBar, makeStyles, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import { FaYoutube } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
}));

const NavBar = () => {
  const classes = useStyles();
  return (
    <AppBar position='static'>
      <Toolbar>
        <button className='logo'>
          <FaYoutube />
        </button>
        <Typography varient='h5' className={classes.title}>
          YouTube App
        </Typography>
        <button className='logout'>
          <FiLogOut />
        </button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;

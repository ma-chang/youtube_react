import React, { useContext } from 'react';
import { ApiContext } from '../context/ApiContext';
import Modal from 'react-modal';

import { Container, Fab, Grid, IconButton, makeStyles, TextField, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import { BsImages } from 'react-icons/bs';
import { FaVideo } from 'react-icons/fa';
import { IoMdCloud } from 'react-icons/io';
import { RiUploadCloud2Line } from 'react-icons/ri';

import VideoList from './VideoList';
import VideoDetail from './VideoDetail';

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: 'center',
  },
  grid: {
    justifyContent: 'center',
  },
}));

const Main = () => {
  const classes = useStyles();
  Modal.setAppElement('#root');
  const { title, setTitle, video, setVideo, thum, setThum, modalIsOpen, setModalIsOpen, newVideo } =
    useContext(ApiContext);

  const customStyles = {
    content: {
      top: '30%',
      right: 'auto',
      bottom: 'auto',
      left: '43%',
    },
  };
  return (
    <>
      <Grid container className={classes.grid}>
        <Grid item xs={11}>
          <Grid container spacing={5}>
            <Grid item xs={12}></Grid>
            <Grid item xs={1}>
              <Fab color='primary' aria-label='add' onClick={() => setModalIsOpen(true)}>
                <AddIcon />
              </Fab>
            </Grid>
            <Grid item xs={8}>
              <VideoDetail />
            </Grid>
            <Grid item xs={3}>
              <VideoList />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Main;

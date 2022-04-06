import React, { useContext } from 'react';
import { ApiContext } from '../context/ApiContext';
import Modal from 'react-modal';

import { Container, Fab, Grid, IconButton, makeStyles, TextField, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import { BsImages } from 'react-icons/bs';
import { FaVideo } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
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
  const { title, setTitle, video, setVideo, thumbnail, setThumbnail, modalIsOpen, setModalIsOpen, newVideo } =
    useContext(ApiContext);

  const customStyles = {
    content: {
      top: '30%',
      right: 'auto',
      bottom: 'auto',
      left: '43%',
    },
  };
  const handleEditMovie = () => {
    const fileInput = document.getElementById('mp4Input');
    fileInput.click();
  };
  const handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
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
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} style={customStyles}>
        <Typography>Movie Title</Typography>
        <br />
        <TextField type='text' onChange={(e) => setTitle(e.target.value)} />
        <br />
        <br />
        <Container className={classes.container}>
          {/* video */}
          <input type='file' id='mp4Input' hidden='hidden' onChange={(e) => setVideo(e.target.files[0])} />
          <IconButton onClick={handleEditMovie}>
            <FaVideo className='photo' />
          </IconButton>
          {/* thumbnail */}
          <input type='file' id='imageInput' hidden='hidden' onChange={(e) => setThumbnail(e.target.files[0])} />
          <IconButton onClick={handleEditPicture}>
            <BsImages className='photo' />
          </IconButton>
          <br />
          {/* upload button */}
          {title && video && thumbnail && (
            <button className='btn-modal' onClick={() => newVideo()}>
              <RiUploadCloud2Line />
            </button>
          )}
          <button className='btn-modal' onClick={() => setModalIsOpen(false)}>
            <IoMdClose />
          </button>
        </Container>
      </Modal>
    </>
  );
};

export default Main;

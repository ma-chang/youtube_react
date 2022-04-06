import { Grid } from '@material-ui/core';
import React, { useContext } from 'react';
import { ApiContext } from '../context/ApiContext';
import VideoItem from './VideoItem';

const VideoList = () => {
  const { videos } = useContext(ApiContext);
  const listOfVideos = videos.map((video) => <VideoItem key={video.id} video={video} />);
  return (
    <Grid container spacing={5}>
      <div className='video-list'>{listOfVideos}</div>
    </Grid>
  );
};

export default VideoList;

import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';
import { withCookies } from 'react-cookie';

export const ApiContext = createContext();

const ApiContextProvider = (props) => {
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

  const token = props.cookies.get('jwt-token');
  const [videos, setVideos] = useState([]);
  const [title, setTitle] = useState('');
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [modelIsOpen, setModelIsOpen] = useState(false);
  useEffect(() => {
    const getVideos = async () => {
      try {
        const res = await axios.get(`${API_ENDPOINT}videos/`, { headers: { Authorization: `JWT ${token}` } });
        setVideos(res.data);
      } catch {
        console.log('error');
      }
    };
    getVideos();
  }, [token]);

  const newVideos = async () => {
    const uploadData = new FormData();
    uploadData.append('title', title);
    uploadData.append('video', video, video.name);
    uploadData.append('thumbnail', thumbnail, thumbnail.name);
    try {
      const res = await axios.post(`${API_ENDPOINT}videos/`, uploadData, {
        headers: { 'Content-Type': 'application/json', Authorization: `JWT ${token}` },
      });
      setVideos([...videos, res.data]);
      setModelIsOpen(false);
      setTitle('');
      setVideo(null);
      setThumbnail(null);
    } catch {
      console.log('error');
    }
  };

  const deleteVideo = async () => {
    try {
      await axios.delete(`${API_ENDPOINT}videos/${selectedVideo.id}`, {
        headers: { 'Content-Type': 'application/json', Authorization: `JWT ${token}` },
      });
      setSelectedVideo(null);
      setVideos(videos.filter((item) => item.id !== selectedVideo.id));
    } catch {
      console.log('error');
    }
  };

  return <div></div>;
};

export default withCookies(ApiContextProvider);

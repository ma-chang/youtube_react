/*eslint no-unused-expressions: "error"*/
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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  useEffect(() => {
    const getVideos = async () => {
      try {
        const res = await axios.get(`${API_ENDPOINT}videos/`, { headers: { Authorization: `JWT ${token}` } });
        setVideos(res.data);
      } catch {
        console.log('error: useEffect');
      }
    };
    getVideos();
  }, [token]);

  const newVideo = async () => {
    const uploadData = new FormData();
    uploadData.append('title', title);
    uploadData.append('video', video, video.name);
    uploadData.append('thumbnail', thumbnail, thumbnail.name);
    try {
      const res = await axios.post(`${API_ENDPOINT}videos/`, uploadData, {
        headers: { 'Content-Type': 'application/json', Authorization: `JWT ${token}` },
      });
      setVideos([...videos, res.data]);
      setModalIsOpen(false);
      setTitle('');
      setVideo(null);
      setThumbnail(null);
    } catch {
      console.log('error: newVideos');
    }
  };

  const deleteVideo = async () => {
    try {
      await axios.delete(`${API_ENDPOINT}videos/${selectedVideo.id}/`, {
        headers: { 'Content-Type': 'application/json', Authorization: `JWT ${token}` },
      });
      setSelectedVideo(null);
      setVideos(videos.filter((item) => item.id !== selectedVideo.id));
    } catch {
      console.log('error: deleteVideo');
    }
  };

  const incrementLike = async () => {
    try {
      const uploadData = new FormData();
      uploadData.append('like', selectedVideo.like + 1);
      const res = await axios.patch(`${API_ENDPOINT}videos/${selectedVideo.id}/`, uploadData, {
        headers: { 'Content-Type': 'application/json', Authorization: `JWT ${token}` },
      });
      setSelectedVideo({ ...selectedVideo, like: res.data.like });
      setVideo(videos.filter((item) => (item.id === selectedVideo.id ? res.data : item)));
    } catch {
      console.log('error: incrementLike');
    }
  };
  const incrementDislike = async () => {
    try {
      const uploadData = new FormData();
      uploadData.append('dislike', selectedVideo.dislike + 1);

      const res = await axios.patch(`${API_ENDPOINT}videos/${selectedVideo.id}/`, uploadData, {
        headers: { 'Content-Type': 'application/json', Authorization: `JWT ${token}` },
      });
      setSelectedVideo({ ...selectedVideo, dislike: res.data.dislike });
      setVideo(videos.filter((item) => (item.id === selectedVideo.id ? res.data : item)));
    } catch {
      console.log('error: incrementDislike');
    }
  };

  return (
    <ApiContext.Provider
      value={{
        videos,
        setVideos,
        title,
        setTitle,
        video,
        setVideo,
        thumbnail,
        setThumbnail,
        selectedVideo,
        setSelectedVideo,
        modalIsOpen,
        setModalIsOpen,
        newVideo,
        deleteVideo,
        incrementLike,
        incrementDislike,
      }}
    >
      {props.children}
    </ApiContext.Provider>
  );
};

export default withCookies(ApiContextProvider);

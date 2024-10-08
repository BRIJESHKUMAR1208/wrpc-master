import React, { useState } from 'react';
import axios from 'axios';
import { Button, Box, IconButton, Paper, Grid, TextField } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../../Api/api.json';
import apiClient from '../../../Api/ApiClient';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import BannerTable from './BannerTable';

export const Banner = ({ id, onDelete }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageName, setImageName] = useState('');

  // const handleVideoUpload = async () => {
    
  //   if (!selectedImage) return;

  //   const formData = new FormData();
  //   formData.append('imgsrc', selectedImage);
  //   formData.append('content', imageName);

  //   try {
  //     const response = await apiClient.post(api.imageAdd, formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });

  //     const videoPath = response.data.videopath;

      
  
  //     // Show a success toast notification
  //     toast.success('Video uploaded successfully!', {
  //       position: toast.POSITION.TOP_CENTER,
  //     });

  //     // Clear the form fields and reset state after successful upload
  //     setSelectedImage(null);
  //     setImageName('');

  //     // Reset the input file element to allow selecting a new video
  //     const inputFile = document.getElementById(`upload-input-${id}`);
  //     if (inputFile) {
  //       inputFile.value = ''; // Clear the selected file
  //     }
  //   } catch (error) {
  //     console.error('Error uploading video:', error);

  //     // Show an error toast notification
  //     toast.error('Error uploading video', {
  //       position: toast.POSITION.TOP_CENTER,
  //     });
  //   }
  // };
  const handleVideoUpload = async () => {
    if (!selectedImage) return;
    if (!imageName.trim()) {
      // Display an error toast notification if image name is blank
      toast.error('Image name cannot be blank', {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    if (!/^[a-zA-Z0-9\s]+$/.test(imageName)) {
      // Display an error toast notification if image name contains special characters
      toast.error('Name should not contain special characters', {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
  
    const formData = new FormData();
    formData.append('imgsrc', selectedImage);
    formData.append('content', imageName);
  
    try {
      const response = await apiClient.post(api.imageAdd, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      const videoPath = response.data.videopath;
  
      // Show a success toast notification
      toast.success('Video uploaded successfully!', {
        position: toast.POSITION.TOP_CENTER,
      });
  
      // Clear the form fields and reset state after successful upload
      setSelectedImage(null);
      setImageName('');
  
      // Reset the input file element to allow selecting a new video
      const inputFile = document.getElementById(`upload-input-${id}`);
      if (inputFile) {
        inputFile.value = ''; // Clear the selected file
      }
    } catch (error) {
      console.error('Error uploading video:', error);
  
      // Show an error toast notification
      toast.error('Error uploading video', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  

  const handleVideoChange = (event) => {
    const imageFile = event.target.files[0];
    const allowedExtensions = /(\.png|\.jpg|\.gif|\.jpeg)$/i;
    if (imageFile && allowedExtensions.test(imageFile.name)) {
      setSelectedImage(imageFile);
    } else {
      // Display an error toast notification if the file type is not allowed
      toast.error('Please select a PNG, JPEG, or GIF image', {
        position: toast.POSITION.TOP_CENTER,
      });
      // Reset the input file element
      event.target.value = '';
    }
  };
  
  const handleContentChange = (event) => {
    setImageName(event.target.value);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <div>
      <Header />
      <Sidebar />
      <main id="main" class="main">
        {/* ... (existing code) ... */}
        <form>
          <Paper elevation={3} sx={{ padding: 2, position: 'relative' }}>
            <h1>Banner</h1>
            {selectedImage && (
              <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
                {/* Display a video preview, if needed */}
                <img
                  width="100"
                  height="100"
                  controls
                  style={{ maxWidth: '100px', maxHeight: '100px', objectFit: 'cover' }}
                  src={URL.createObjectURL(selectedImage)}
                />
                 
              </Box>
            )}

            {/* Input for uploading video */}
            <input
              type="file"
         
              onChange={handleVideoChange}
              style={{ display: 'none' }}
              id={`upload-input-${id}`}
            />
            <label htmlFor={`upload-input-${id}`}>
              <Button variant="outlined" component="span">
                <AddPhotoAlternateIcon />
                Choose File
              </Button>
            </label>

            {selectedImage && (
              <IconButton onClick={handleDelete} sx={{ position: 'absolute', top: 5, right: 5 }}>
                <DeleteIcon />
              </IconButton>
            )}

            {/* Text field for video name */}
            <TextField
              label="Video Name"
              value={imageName}
              onChange={handleContentChange}
              fullWidth
              sx={{ marginTop: 2 }}
              required
            />

            {/* Upload button */}
            <Button
              variant="contained"
              color="primary"
              onClick={handleVideoUpload}
              disabled={!selectedImage}
              sx={{ marginTop: 2 }}
            >
              <UploadFileIcon />
              Upload Video
            </Button>

            <ToastContainer /> 
          </Paper>
        </form>
        <div>
          <h1>Table</h1>
        </div>
        <BannerTable />
      </main>
      <Footer />
    </div>
  );
};

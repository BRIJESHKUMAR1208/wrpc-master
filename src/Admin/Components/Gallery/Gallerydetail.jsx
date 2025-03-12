import React, { useEffect, useState } from 'react';
import {  Card, Col, Container, Form, Spinner } from 'react-bootstrap';
import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import axios from 'axios';
import { Row } from 'react-bootstrap/esm';
import { Link, useParams } from 'react-router-dom';
import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';
import Footer from '../footer/Footer.jsx';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import apiClient from '../../../Api/ApiClient';

export default function GalleryDetail() {
  const { id } = useParams();
  const galleryId = parseInt(id, 10);
  const [galleryData, setGalleryData] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [selectedFiles, setSelectedFiles] = useState([]); // Store selected files

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        debugger;
        const response = await apiClient.get(`/api/Gallery/GetGallery/${galleryId}`);
        setGalleryData(response.data);
      } catch (error) {
        console.error('Error fetching gallery data:', error);
      }
    };

    if (galleryId) {
      fetchGalleryData();
    }
  }, [galleryId]);

  const handleDelete = async (imagePath) => {
    try {
      const updatedImages = galleryData.ImagePaths.filter((image) => image !== imagePath);
      const formData = new FormData();
      formData.append('id', galleryId);
      formData.append('ImagePaths', updatedImages);
      formData.append('titlename', galleryData.title);

      
      const  response = await apiClient.post(`/api/Gallery/Delete`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

     

      if (response.status === 200) {
        setGalleryData({ ...galleryData, ImagePaths: updatedImages });
        setSnackbarMessage('Image deleted successfully.');
        setSnackbarSeverity('success');
        // Refresh the page
        window.location.reload();
      } else {
        setSnackbarMessage('Failed to add images.');
        setSnackbarSeverity('error');
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      setSnackbarMessage('Failed to delete image.');
      setSnackbarSeverity('error');
    } finally {
      setSnackbarOpen(true);
    }
  };

  // Handle file selection
  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files); // Store selected files in state
    
  };
  // const handleFileSelect = (event) => {
  //   const files = Array.from(event.target.files);
  //   const lstImagePaths = files.map((file) => URL.createObjectURL(file)); // Create temporary preview URLs
  
  //   setSelectedFiles((prevFiles) => [...prevFiles, ...files]); // Store actual files
  //   setGalleryData((prevData) => ({
  //     ...prevData,
  //     lstImagePaths: [...(prevData.lstImagePaths || []), ...lstImagePaths], // Show selected images in the list
  //   }));
  // };
  

  // Upload selected images
  const handleUploadImages = async () => {
    debugger;
    if (selectedFiles.length === 0) {
      setSnackbarMessage('Please select at least one image.');
      setSnackbarSeverity('warning');
      setSnackbarOpen(true);
      return;
    }

    const formData = new FormData();
    formData.append('id', galleryId);
    formData.append('titlename', galleryData.title);
    formData.append('ImagePaths', galleryData.ImagePaths);
    //setSelectedFiles(...selectedFiles,  updatedImages)
    selectedFiles.forEach((file) => {
      formData.append('lstImagePaths', file); // Append each file
    });
      
   // setGalleryData({ ...galleryData, ImagePaths: updatedImages });

    try {
      const response = await apiClient.post(`/api/Gallery/UpdateGallery`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      if (response.status === 200) {
        setSnackbarMessage('Images added successfully.');
        setSnackbarSeverity('success');
        setSelectedFiles([]); // Clear selected files
  
        // Refresh the page
        window.location.reload();
      } else {
        setSnackbarMessage('Failed to add images.');
        setSnackbarSeverity('error');
      }
    } catch (error) {
      console.error('Error adding images:', error);
      setSnackbarMessage('Failed to add images.');
      setSnackbarSeverity('error');
    } finally {
      setSnackbarOpen(true);
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', flex: 0.5 },
    { field: 'image', headerName: 'Image', flex: 1, renderCell: (params) => (
        <img
          src={apiClient.defaults.baseURL + params.value}
          alt={`image-${params.row.id}`}
          style={{ width: '100px', height: '100px' }}
        />
      )
    },
    { field: 'imagePath', headerName: 'Path', flex: 2 },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      flex: 1,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => handleDelete(params.row.imagePath)}
        />,
      ],
    },
  ];

  const rows = galleryData.ImagePaths
    ? galleryData.ImagePaths.map((image, index) => ({
        id: index + 1,
        image,
        imagePath: image,
      }))
    : [];

  return (
    <div>
      <Header />
      <Sidebar />
      <main id="main" className="main">
        <div className="pagetitle">
          <div className="pagetitle-lft">
            <h1 className="maintitle">Gallery Details</h1>
            <nav>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">Home</li>
                <li className="breadcrumb-item">Service</li>
                <li className="breadcrumb-item active">Gallery Data</li>
              </ol>
            </nav>
          </div>
          <div className="pagetitle-rgt">
            <Link to="/dashboard">
              <button type="button" className="btn btn-info">Back</button>
            </Link>
          </div>
        </div>

        <div><Col md={10} lg={12} xs={12}>
                                    <Card>
                                        <Card.Body>
          <h2>{galleryData.title}</h2>

          {/* File Input */}
          <input
            type="file"
            name="file"
            multiple
            accept="image/jpeg, image/jpg, image/png"
            onChange={handleFileSelect}
            style={{ marginBottom: '10px' }}
          />

          {/* Add Gallery Button */}
          <button
            type="button"
            className="btn btn-primary ms-2"
            onClick={handleUploadImages}
          >
            Add Gallery
          </button>
          </Card.Body>
                                    </Card>
                                </Col>
                           
          {galleryData.ImagePaths && galleryData.ImagePaths.length > 0 ? (
            <Box sx={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
              />
            </Box>
          ) : (
            <p>No images found.</p>
          )}
        </div>
      </main>
      <Footer />

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}
